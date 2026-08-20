import http from "http";

async function testRoute(path) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:3000${path}`, { headers: { "User-Agent": "TestClient" } }, (res) => {
      resolve({
        path,
        statusCode: res.statusCode,
        location: res.headers.location || null,
      });
    });
    req.on("error", (err) => {
      resolve({ path, error: err.message });
    });
  });
}

async function runRouteTests() {
  console.log("=========================================");
  console.log("🌐 TESTING NEXT.JS APPLICATION ROUTES & GUARDS");
  console.log("=========================================\n");

  const routesToTest = [
    "/",
    "/features",
    "/pricing",
    "/reviews",
    "/how-it-works",
    "/login",
    "/signup",
    "/forgot-password",
    "/plans",
    "/dashboard", // Protected route
    "/phantom",   // Protected route
  ];

  for (const route of routesToTest) {
    const res = await testRoute(route);
    if (res.error) {
      console.log(`❌ ${route} -> Error: ${res.error}`);
    } else if (res.statusCode === 307 || res.statusCode === 302) {
      console.log(`🔒 ${route} -> Status ${res.statusCode} (Redirected to: ${res.location})`);
    } else {
      console.log(`✅ ${route} -> Status ${res.statusCode} OK`);
    }
  }

  console.log("\n=========================================");
  console.log("🎉 ROUTE TESTING COMPLETED");
  console.log("=========================================");
}

runRouteTests();
