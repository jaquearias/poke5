
<template>
	<div>
		<div class="header">
			<h1>POKEMON</h1>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Header'
}
</script>

<style>
.header {
	/* background-color: #FA8072; */
	background-image: url('https://i.blogs.es/82d7ef/pokemon/1366_521.jpeg');
	/* background-image: url('https://www.nintenderos.com/wp-content/uploads/2019/03/pokemon.jpg'); */
	/* background-position: left top; */
	width: 100%;
	height: 130px;
	align-content: center;
	text-align: center;
	font-size: 30px;
}

.header h1 {
	font-weight: bold;
	font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	letter-spacing: 2px;
	color: white;
	/* background-color: #FA8072; */
	text-shadow: 5px 5px 4px rgba(0, 0, 0, 1);
}

</style>