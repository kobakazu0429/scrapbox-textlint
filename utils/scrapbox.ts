import type { UserResponse, ImportedPage } from "scrapbox-types/response";

const cookie = (sid: string) => `connect.sid=${sid}`;

export const fetchProfile = async (sid: string) => {
  const res = await fetch("https://scrapbox.io/api/users/me", {
    headers: { Cookie: cookie(sid) },
  });
  const json = await res.json();
  return json as UserResponse;
};

export const importProject = async (
  projectName: string,
  sid: string,
  pages: ImportedPage[]
) => {
  const formData = new FormData();
  formData.append(
    "import-file",
    new Blob([JSON.stringify({ pages })], {
      type: "application/octet-stream",
    })
  );
  formData.append("name", "undefined");

  const user = await fetchProfile(sid);

  return await fetch(
    `https://scrapbox.io/api/page-data/import/${projectName}.json`,
    {
      method: "POST",
      headers: {
        Cookie: cookie(sid),
        Accept: "application/json, text/plain, */*",
        "X-CSRF-TOKEN": user.csrfToken,
      },
      body: formData,
    }
  );
};
