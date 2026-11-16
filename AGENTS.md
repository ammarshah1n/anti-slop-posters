# Instructions for coding agents (Claude Code, Codex, Cursor, Gemini CLI)

When asked for a poster, flyer, event or sale graphic, invitation, cover, social visual or
motion poster, or told a design "looks like AI" or "looks generic":

1. Read `skills/poster-design/SKILL.md` and follow it exactly. It sets the process:
   brief, decision block, build in HTML from `skills/poster-design/template/`, render and
   check with `skills/poster-design/scripts/render.mjs`, LOOK at the PNG, cold review,
   at most two rounds.
2. Work in the user's project, not inside `skills/`. Copy the template there.
3. Never invent facts (dates, addresses, prices, quotes). Mark gaps `[TO CONFIRM]`.
4. Never ship a poster without viewing the rendered PNG. If you cannot view images, say so.
5. For motion, use `motion/` (Remotion) and `skills/poster-design/reference/motion.md`.
6. For image generation prompts, use `prompts/04-image-generation.md`.

For web pages and app UI (not posters), this pack does not apply. A good companion is
the open-source `Nutlope/hallmark` skill.
