async function handleSubmit(e) {
  e.preventDefault();

  const userData = {
    email: form.email,
    password: form.password,
    phone: form.phone,
    name: {
      first: form.name.first,
      middle: form.name.middle || "",
      last: form.name.last,
    },
    image: {
      url: form.image.url,
      alt: form.image.alt,
    },
    address: {
      state: form.address.state || "IL",
      country: form.address.country || "Israel",
      city: form.address.city,
      street: form.address.street,
      houseNumber: Number(form.address.houseNumber),
      zip: Number(form.address.zip),
    },
    isBusiness: form.isBusiness ?? true, //
  };

  try {
    const updatedUser = await updateUser(id, userData);
    console.log("updateduser:", updatedUser);

    navigate("/");

    alert("user updated successfully!");
    console.log("🆔 useParams id:", id);
  } catch (err) {
    console.error(err);
    alert("Error updating user");
  }
}
if (!form) return <p>Loading card...</p>;
