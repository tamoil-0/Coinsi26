"use client";

import { useEffect, useState } from "react";
import type { Status } from "@/lib/schema";
import { effectiveStatus } from "@/lib/status";
import { statusHint } from "@/lib/labels";
import { StatusBadge } from "./OpportunityCard";

/** Recalcula el estado con la fecha del visitante: una convocatoria vencida nunca se muestra abierta. */
export function LiveStatus({ status, deadline, hint = false }: { status: Status; deadline: string | null; hint?: boolean }) {
  const [s, setS] = useState<Status>(effectiveStatus({ status, applicationDeadline: deadline }));
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fecha real del navegador
    setS(effectiveStatus({ status, applicationDeadline: deadline }, new Date()));
  }, [status, deadline]);
  return (
    <>
      <StatusBadge status={s} />
      {hint && <span className="text-[14px] text-muted">{statusHint[s]}</span>}
    </>
  );
}
