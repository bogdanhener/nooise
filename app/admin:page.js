"use client";

import { supabase } from "../../lib/supabase";

export default function Admin() {

  async function upload(e) {
    const files = e.target.files;

    for (let file of files) {
      const { data } = await supabase.storage
        .from("nooise-photos")
        .upload(`events/${Date.now()}-${file.name}`, file);

      const url = `https://cntbmodmvknudjdapxyz.supabase.co/storage/v1/object/public/nooise-photos/${data.path}`;

      await supabase.from("event_photos").insert({
        image_url: url
      });
    }

    alert("Uploaded successfully");
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Upload</h1>
      <input type="file" multiple onChange={upload} />
    </div>
  );
}