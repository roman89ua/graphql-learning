async function fetchGraphql() {
  const response = await fetch("http://localhost:9000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: "query { greeting }" }),
  });

  const { data } = await response.json();
  return data.greeting;
}

fetchGraphql().then((greeting) => {
  const greetingPlace = document.querySelector("#greeting");
  greetingPlace.textContent = greeting;
});
