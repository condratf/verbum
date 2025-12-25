'use server'
export const handleSubmit = async ({ selectedLanguage, selectedLevel }: { selectedLanguage?: string | null; selectedLevel?: string | null }) => {
  const { upsertUserMe } = await import('@/lib/userme')
  await upsertUserMe({
    learn_language: selectedLanguage || undefined,
    lang_level: selectedLevel || undefined,
  })
}
