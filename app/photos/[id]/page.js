async function loadImages() {
  const folder = params.id;

  const { data, error } = await supabase.storage
    .from("nooise-photos")
    .list(folder, {
      limit: 100,
      sortBy: { column: "name", order: "asc" }
    });

  if (error) {
    console.log("STORAGE ERROR:", error);
    return;
  }

  console.log("FILES:", data);

  const urls = data.map((file) => {
    const { data: urlData } = supabase.storage
      .from("nooise-photos")
      .getPublicUrl(`${folder}/${file.name}`);

    return urlData.publicUrl;
  });

  console.log("FINAL URLS:", urls);

  setImages(urls);
}