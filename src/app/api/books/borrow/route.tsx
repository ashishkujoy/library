const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const POST = async (_req: Request) => {
    console.log(_req.url)
    await delay(1000);
    return new Response(JSON.stringify({ message: "Borrowed book successfully" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}