export default function LoadingSpinner() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-stone-200 border-t-burgundy-700" />
        <p className="text-sm text-stone-500">Loading...</p>
      </div>
    </div>
  )
}
