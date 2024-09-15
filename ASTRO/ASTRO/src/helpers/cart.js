export const updateCart = async (actionName, productId) => {
    // Get cart
    fetch(`${import.meta.env.PUBLIC_SERVER_URL}/api/users/me/?populate=*`, {
      headers: new Headers({
        Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        "Content-Type": "application/json",
      }),
    })
      .then((res) => {
        if (res.ok === false) {
          showToast("Error", "OOPS :( Maybe you haven't SIGN IN 😬");
          return;
        }
        return res.json();
      })
      .then((data) => {
        let isAlreadyInCart = false;
        let updatedCart = data.cart;
        productId=Number(productId)
        
        if (actionName === "delete") {
          // Update user cart, need only product ids --> example [3, 4, 6]
            updatedCart = updatedCart
            .filter((cartItem) => cartItem.id !== productId)
            .map((cartItem) => cartItem.id);
        }
  
        // Updated cart after adding cartItem
        if (actionName === "add") {
            // Extract product IDs from the cart
              const productIds = updatedCart.map((cartItem) => cartItem.id);
              productId = Number(productId)
            if (productIds.includes(productId)) {    
              showToast("Cart", "Product is already in your cart!");
              isAlreadyInCart = true;
            } else {
              updatedCart.push({id:productId});
            }
          }
    
          if (!isAlreadyInCart) {
            fetch(`${import.meta.env.PUBLIC_SERVER_URL}/api/users/${data.id}`, {
              method: "PUT",
              headers: new Headers({
                Authorization: `Bearer ${document.cookie.split("=")[1]}`,
                "Content-Type": "application/json",
              }),
              body: JSON.stringify({ cart: [...updatedCart] }),
            }).then((res) => {
              if (res.ok === false) {
                showToast("Error", "OOPS :( Maybe you haven't SIGNED IN 😬");
              }
              if (res.ok === true) {
                showToast("Success", "Update the page to see the difference!");
              }
            });
          }
        })
        .catch((err) => showToast("Error", `OOPS :( Maybe you haven't SIGNED IN 😬 ${err}`));
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