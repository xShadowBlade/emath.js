---
id: setup
title: Setting up the game
sidebar_label: Setup
sidebar_position: 2
---

---

### HTML Setup

Create a folder in which your game will be located. For this tutorial, we will title it ``coinGame``

Next, create a HTML file named ``index.html`` and put the following code in it:

```html
<!DOCTYPE html>
<html>
	<head>
		<script src="https://cdn.jsdelivr.net/gh/xShadowBlade/emath.js/dist/main/eMath.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/xShadowBlade/emath.js/dist/game/eMath.game.js"></script>
		<script src="./script.js"></script>
	</head>
	<body>
	</body>
</html>
```

This code sets up the project and imports ``emath.js`` and ``emath.js/game`` using jsDelivr. Alternatively, you can download ``emath.js`` on a local copy, though this is not recommended as you will have to manually check for updates.

Now, create a js file named ``script.js`` and put the following code in it:

```js
window.addEventListener("load", () => {
    const { E } = eMath;
});
```

This code attaches an event listener to the "load" event of the window and, upon loading, extracts the E object from the eMath library, so you don't have to do ``eMath.E`` every time. For the rest of the tutorial, we will be putting the code inside this event listener.

### NodeJS setup

Create a folder in which your game will be located. For this tutorial, we will title it ``coinGame``.

Next, initiate the project. For a quick start, see my [template defaults](https://github.com/xShadowBlade/template-defaults) repo, which will quickly initiate your project with configuration like the one used in this tutorial.

<!-- Next, init the project. For a quick setup, run:

```bash
npm init -y
``` -->

Now, to install ``emath.js``, run:

```bash
npm install emath.js
```

---

After you have setup the game, continue to the [currency tutorial](./currency).
