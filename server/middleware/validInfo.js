module.exports = (req, res, next) => {
  const { first_name, email_address, password } = req.body;
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/register") {
      console.log(!email_address.length);
      if (![email_address, first_name, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email_address)) {
        return res.status(401).json("Invalid Email");
      }
    } else if (req.path === "/login") {
      if (![email_address, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email_address)) {
        return res.status(401).json("Invalid Email");
      }
    }
  
    next();
  };