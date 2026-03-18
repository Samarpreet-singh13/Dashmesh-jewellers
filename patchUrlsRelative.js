const fs = require('fs');

const replaceInFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace the specific localhost fallback with an empty string for relative domain fetching
    content = content.replace(/\|\| 'http:\/\/localhost:5000'/g, "|| ''");
    fs.writeFileSync(filePath, content, 'utf8');
}

const files = [
    "c:/Users/hp/dashmesh-jewellers/dashmesh-jewellers/client/src/pages/Search.jsx",
    "c:/Users/hp/dashmesh-jewellers/dashmesh-jewellers/client/src/pages/Register.jsx",
    "c:/Users/hp/dashmesh-jewellers/dashmesh-jewellers/client/src/pages/Login.jsx",
    "c:/Users/hp/dashmesh-jewellers/dashmesh-jewellers/client/src/pages/Home.jsx",
    "c:/Users/hp/dashmesh-jewellers/dashmesh-jewellers/client/src/pages/Design.jsx",
    "c:/Users/hp/dashmesh-jewellers/dashmesh-jewellers/client/src/pages/Contact.jsx",
    "c:/Users/hp/dashmesh-jewellers/dashmesh-jewellers/client/src/pages/Category.jsx",
    "c:/Users/hp/dashmesh-jewellers/dashmesh-jewellers/client/src/pages/admin/EditDesign.jsx",
    "c:/Users/hp/dashmesh-jewellers/dashmesh-jewellers/client/src/pages/admin/AdminLogin.jsx",
    "c:/Users/hp/dashmesh-jewellers/dashmesh-jewellers/client/src/pages/admin/AdminInquiries.jsx",
    "c:/Users/hp/dashmesh-jewellers/dashmesh-jewellers/client/src/pages/admin/AdminDesigns.jsx",
    "c:/Users/hp/dashmesh-jewellers/dashmesh-jewellers/client/src/pages/admin/AddDesign.jsx"
];

try {
    files.forEach(replaceInFile);
    console.log("All UI components successfully converted to relative paths.");
} catch (err) {
    console.error(err);
}
