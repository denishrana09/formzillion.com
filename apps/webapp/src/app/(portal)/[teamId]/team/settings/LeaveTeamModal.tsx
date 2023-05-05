"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/Dialog";
import Button from "@/ui/Buttons";
import updateTeam from "@/app/fetch/teams/updateTeam";
import { useRouter } from "next/navigation";

export default function LeaveTeamModal({ closeModal, teamSlug }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState<any>(false);

  const onClickLeaveTeam = () => {
    setLoading(true);
    const response: any = updateTeam({
      teamName: teamSlug.name,
      teamSlug: teamSlug.slug,
      type: "leaveTeam",
    });
    closeModal();
    if (response) {
      setLoading(false);
    }
    router.push("/dashboard");
  };

  return (
    <Dialog open={closeModal} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Leave Team</DialogTitle>
          <DialogDescription className="text-gray-600">
            Once you leave your team, you will no longer be able to access it.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            loading={loading}
            className="bg-orange-600  text-white rounded-none"
            onClick={() => onClickLeaveTeam()}
            type="submit"
          >
            Leave team
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
