const fetchFijordItems = async () => {
  const response = await fetch(
    'https://bootcamp.fjord.jp/'
    )
  const html = await response.text()
  console.log(html)
}

fetchFijordItems()
