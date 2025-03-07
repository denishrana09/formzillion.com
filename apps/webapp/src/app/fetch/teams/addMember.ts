import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";

/**
 * This route creates a new team for a user within a certain organization.
 * @param {string} teamName - team Name
 * @param {string} teamSlug - team Slug
 * @returns
 */
const addMember = async ({
  emailsToInvite,
  teamSlug,
  role,
}: {
  emailsToInvite?: string;
  teamSlug?: string;
  role?: string;
}) => {
  const response = await fetch("/api/teams/addMember", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailsToInvite,
      teamSlug,
      role,
    }),
  });
  const res = await response.json();

  return res || {};
};

export default addMember;
