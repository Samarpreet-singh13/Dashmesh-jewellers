const fs = require('fs');

const replaceInFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace backtick instances
    content = content.replace(/`http:\/\/localhost:5000(.*?)`/g, "`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}$1`");
    // Replace strict double quote instances
    content = content.replace(/"http:\/\/localhost:5000(.*?)"/g, "((import.meta.env.VITE_API_URL || 'http://localhost:5000') + \"$1\")");
    
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
    console.log("All files updated successfully.");
} catch (err) {
    console.error(err);
}
