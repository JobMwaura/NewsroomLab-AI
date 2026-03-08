// ─── NewsroomLab AI — Template Index ────────────────────
// Single import point for all teaching templates.

export { courseTemplates, courseTemplateCodes, getCourseTemplate } from "./course-templates"
export { storyTemplates, getStoryTemplate, getTemplatesByCategory, storyTemplateCategories, allStoryTemplateIds } from "./story-templates"
export { rubricPresets, getRubricPreset, rubricPresetIds } from "./rubric-presets"
export { microLessons, getMicroLesson, getMicroLessonsForTemplate, microLessonIds } from "./micro-lessons"
export { reflectionPromptSets, getReflectionPromptSet, getReflectionPromptsForCourse, reflectionPromptSetIds } from "./reflection-prompts"
export { weeklyModules, getWeeklyModules, getWeek, getAllCourseCodes, calculateUnlockDate, isWeekUnlocked, getWeekCAWeight } from "./weekly-modules"
