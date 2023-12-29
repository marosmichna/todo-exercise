
export function formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000); 
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    //   hour: "numeric",
    //   minute: "numeric",
    });
  }

