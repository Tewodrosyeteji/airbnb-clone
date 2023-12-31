"use client";

import Button from "./Button";
import Heading from "./Heading";
import { useRouter } from "next/navigation";
type EmptyStateProps = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
};

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removeing some of your filter",
  showReset,
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2 h-[60vh] justify-center items-center ">
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
