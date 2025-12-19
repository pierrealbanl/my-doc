---
id: introduction
title: Introduction
---

# C++

Le C++ est un langage de programmation compilé et hautement performant, conçu comme une évolution du langage C. Il introduit des abstractions de haut niveau tout en conservant un contrôle précis des ressources matérielles et des performances. L’objectif du C++ est de permettre à la fois la programmation bas niveau, à l’image du C, et la programmation haut niveau structurée, sans compromis sur l’efficacité ni sur la rapidité d’exécution.

La différence fondamentale entre le C et le C++ **réside dans leur paradigme de programmation.** Le C repose sur une approche **procédurale**, centrée sur les fonctions et les structures de données, tandis que le C++ est **un langage multiparadigme.** **Il intègre la programmation procédurale héritée du C, la programmation orientée objet, ainsi que des concepts issus de la programmation fonctionnelle.**

### Préambule

Pour la première fois dans cette documentation, une transition entre deux langages est abordée en préambule afin d’en comprendre les différences.

Avant toute chose, il est intéressant de faire un parallèle avec la documentation TypeScript, qui aurait pu être illustrée par un passage de JavaScript à TypeScript. La situation y est cependant différente : TypeScript repose sur les mêmes fondements que JavaScript et constitue essentiellement une surcouche typée. Il est donc souvent préférable d’apprendre directement TypeScript plutôt que de passer par JavaScript.

Comme indiqué dans le préambule de cette documentation, le langage C doit être abordé avant même d’entamer l’apprentissage du C++. Il constitue le langage fondateur de la grande majorité des langages modernes. Le C++ étant une évolution du C, les fondamentaux de la programmation procédurale y restent les mêmes, mais sont optimisés et enrichis par des concepts plus modernes. Cette section présente ainsi les équivalents modernes de la programmation procédurale en C++, marquant la transition du C vers le C++.

**Manipulation des chaînes de caractères et affichage en sortie standard :**

Pour la manipulation des chaînes de caractères, l’approche est différente. En C++, on n’utilise plus `char *` pour gérer les chaînes, mais le type `std::string` fourni par la bibliothèque standard. Celui-ci gère automatiquement la mémoire, la taille de la chaîne et les opérations courantes (concaténation, comparaison, accès aux caractères), ce qui évite les erreurs classiques comme les débordements de mémoire.

De la même manière, pour l’affichage en sortie standard, on n’utilise plus `printf`, mais la bibliothèque `<iostream>` avec `std::cout`, qui repose sur un système de flux typé et mieux intégré au langage C++.

```cpp
#include <iostream>
#include <string>

// Exemple simple de manipulation de chaînes en C++
int main() {
    std::string str = "Hello"; // Chaîne de caractères C++ : mémoire gérée automatiquement, taille dynamique
    str += " World!"; // Concaténation (équivalent fonctionnel de strcat en C)
    const char* p = str.c_str(); // Donne un accès en lecture seule au contenu de la chaîne au format C (char*)

    std::cout << p << '\n'; // Affichage sur la sortie standard via un flux
}
```

À noter que `<<` est l’opérateur d’insertion dans un flux. Il permet d’envoyer des données vers un flux de sortie, ici `std::cout`. L’instruction `std::cout << p << '\n';` insère donc le contenu pointé par p dans le flux de sortie standard, puis ajoute un saut de ligne.

**Tableaux et structures de données :**

Pour créer un tableau d’entiers, on n’utilise plus `int *` ni `int arr[size]`. En C++, on privilégie `std::vector` pour les tableaux dynamiques, dont la taille est déterminée à l’exécution, et `std::array` pour les tableaux statiques, dont la taille est fixée à la compilation.

De plus, des opérations telles que `.size()`, `.front()` et `.back()` permettent respectivement de récupérer la taille, la première valeur et la dernière valeur d’un vecteur ou d’un tableau.

```cpp
#include <iostream>
#include <vector>
#include <array>

int main() {
    // Équivalent à une allocation dynamique en C : int* arr = malloc(n * sizeof(int));
    std::vector<int> vec = {5, 10, 15, 20};
    // Parcourt chaque élément du vecteur et affiche sa valeur
    for (int i : vec)
        std::cout << "vec = " << i << '\n';
    std::cout << "La taille du vecteur est " << vec.size() << '\n';
    std::cout << "La première valeur du vecteur est " << vec.front() << '\n';
    std::cout << "La dernière valeur du vecteur est " << vec.back() << '\n';

    // Équivalent à un tableau de taille fixe en C : int arr[4] = {25, 30, 35, 40};
    std::array<int, 4> arr = {25, 30, 35, 40};
    // Parcourt chaque élément du tableau et affiche sa valeur
    for (int i : arr)
        std::cout << "arr = " << i << '\n';
    std::cout << "La taille du tableau est " << arr.size() << '\n';
    std::cout << "La première valeur du tableau est " << arr.front() << '\n';
    std::cout << "La dernière valeur du tableau est " << arr.back() << '\n';
}
```

De la même manière, le parcours d’un tableau diffère entre le C et le C++. En C, le parcours se fait généralement à l’aide d’un indice. En C++, on utilise généralement la boucle *range-based for*, qui parcourt directement un conteneur. À chaque itération, on peut soit récupérer une copie de chaque élément `int i`, soit accéder directement à l’élément via une référence `int& i`.

:::info
> La **range-based for** permet de parcourir directement un conteneur sans avoir à gérer d’indices.

```cpp
for (int i : arr)
    std::cout << i << '\n';
```
À chaque itération, la boucle récupère la valeur de chaque élément contenu dans le conteneur `vec` et la place dans la variable `i`.
:::

L’utilisation d’une référence est généralement plus efficace en termes de performances, car elle évite la création de copies inutiles et permet d’accéder directement aux éléments stockés dans le conteneur :

```cpp
for (int &i : arr)
    std::cout << i << '\n';
```
