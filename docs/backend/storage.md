---
title: Upload Storage
---

# Upload storage and migration

Local storage remains the default. Set `STORAGE_DRIVER=s3` to use a private S3-compatible bucket for API uploads, bot uploads, image serving and generated covers. Existing database image IDs and image URLs are preserved; no database migration is needed. Fonts and symbols remain bundled read-only assets. Telegram downloads still use the local Bot API server's file cache.

Use Bun 1.3.2 or newer. Configure the backend environment:

```env
STORAGE_DRIVER=s3
STORAGE_S3_BUCKET=contests
STORAGE_S3_ACCESS_KEY_ID=your-access-key
STORAGE_S3_SECRET_ACCESS_KEY=your-secret-key
STORAGE_S3_REGION=us-east-1
# For non-AWS providers:
STORAGE_S3_ENDPOINT=https://your-s3-endpoint
# Optional namespace shared by runtime and migration:
STORAGE_S3_PREFIX=contests
```

Keep the bucket private. Credentials need GetObject, PutObject and DeleteObject on the configured prefix. Telegram must be able to reach the bucket endpoint: covers use a signed GET URL valid for one hour and are deleted after sendPhoto completes. Configure lifecycle cleanup for old `covers/` objects left by process crashes. Image and cover volumes are unnecessary in bucket mode.

## Cutover

1. Back up `storage/images` and the database. Deploy this code in local mode first.
2. With bucket credentials configured for the migration process, preview from the backend directory:

   ```sh
   STORAGE_DRIVER=s3 bun run scripts/migrate-storage.ts /absolute/path/to/storage/images --dry-run
   ```

3. Run without `--dry-run` to copy. Each uploaded object is downloaded and compared byte for byte. Retries skip identical objects and fail on conflicts or verification errors. Source files are never deleted. Hidden placeholder files and directories are ignored. Dry runs read the bucket but write nothing.
4. Stop all backend writers (API and bot), rerun the migration for the final delta, and wait for successful exit. Do not overlap local and bucket writers during cutover.
5. Set `STORAGE_DRIVER=s3` on every backend instance and restart. Verify an existing image, API upload/replacement, bot upload and cover delivery against the real provider before retiring image and cover mounts. Keep the backup.

Local covers are temporary and are not migrated. Cached cover IDs stored by Telegram remain valid.

## Rollback

Before new bucket writes, restart all instances in local mode with the original directory. After bucket writes, stop writers and sync bucket `images/` objects (under the configured prefix) back into `storage/images`, preserving basenames and verifying bytes, before restarting locally. Otherwise newer database image IDs will be missing locally. Preserve bucket objects and backups.

## Validation

Run `bun test` in `backend`. Tests exercise local behavior and Bun S3 HTTP operations against a local test server, including verified migration, retry, dry run and conflict detection. Real provider permissions, signed URL accessibility from Telegram and production data cutover require deployment validation.

The existing dev branch has four TypeScript errors unrelated to storage: three missing `nyx-bot-client` utility imports and an optional photo type in `pipelines/message/private/default.ts`. The same errors occur before and after this change.
