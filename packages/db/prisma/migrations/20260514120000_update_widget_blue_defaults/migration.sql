UPDATE "WidgetSettings"
SET "gradientFrom" = '#406AAF'
WHERE "gradientFrom" IN ('#052e2b', '#047857');

UPDATE "WidgetSettings"
SET "themeColor" = '#406AAF'
WHERE "themeColor" IN ('#052e2b', '#047857');

ALTER TABLE "WidgetSettings"
ALTER COLUMN "gradientFrom" SET DEFAULT '#406AAF',
ALTER COLUMN "themeColor" SET DEFAULT '#406AAF';
