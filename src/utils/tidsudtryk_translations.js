import { daTidsudtryk } from './tids_translations/da.js';
import { group1Translations } from './tids_translations/group1.js';
import { group2Translations } from './tids_translations/group2.js';
import { group3Translations } from './tids_translations/group3.js';
import { group4Translations } from './tids_translations/group4.js';

export const tidsudtrykTranslations = {
  da: daTidsudtryk,
  ...(group1Translations || {}),
  ...(group2Translations || {}),
  ...(group3Translations || {}),
  ...(group4Translations || {})
};
