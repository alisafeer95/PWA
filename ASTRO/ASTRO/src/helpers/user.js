
export const authUser = async (payload, actionName) => {
    // Get url according to action
    const url =
      actionName === "sign_in"
        ? `${import.meta.env.PUBLIC_SERVER_URL}/api/auth/local`
        : `${import.meta.env.PUBLIC_SERVER_URL}/api/auth/local/register`;
  
    const response = await fetch(url, {
      method: "POST",
      body: payload,
    });
  
    const data = await response.json();
  
   
    // Check for jwt token
    if (data.jwt) {
      // Success! Save jwt token to cookie using 'cookie' endpoint
      fetch(`${import.meta.env.PUBLIC_CLIENT_URL}/cookie`, {
        method: "POST",
        headers: {  "Content-Type": "application/json","Authorization": `${data.jwt}` },
      }).then((res) => {
        // Redirect
        window.location.href = "/cart";
      });
    } else {
      showToast("Error", "Something went wrong. Try again!");
    }
  };

  


  function showToast(type, message) {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerText = message;
  
    // Style the toast (optional)
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.padding = "10px 20px";
    toast.style.color = "#fff";
    toast.style.backgroundColor = type === "Error" ? "#e74c3c" : "#2ecc71";
    toast.style.borderRadius = "5px";
    toast.style.zIndex = "9999";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s ease";
  
    document.body.appendChild(toast);
  
    // Make the toast visible
    setTimeout(() => {
      toast.style.opacity = "1";
    }, 100);
  
    // Remove the toast after a few seconds
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 500);
    }, 3000);
  }
  