<?php
	require_once 'vendor/autoload.php';
	$loader = new Twig_Loader_Filesystem('views');
	$twig = new Twig_Environment($loader);
	$twig->addGlobal('path', 'assets/build');
?>