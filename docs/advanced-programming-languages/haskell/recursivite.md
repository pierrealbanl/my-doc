---
id: recursivite
title: 4. La récursivité
---

# La récursivité

**La récursivité** est un mécanisme qui permet de définir une fonction qui s’appelle elle-même afin de résoudre un problème étape par étape. La récursivité est particulièrement adaptée à la manipulation des listes, car celles-ci sont naturellement définies de façon récursive : **soit une liste est vide, soit elle est composée d’une tête et d’une sous-liste.**

Pour qu’une fonction récursive fonctionne correctement, quatre éléments sont indispensables :

> **Un cas d’arrêt :** le cas d’arrêt est une règle de définition d’une fonction récursive qui ne contient aucun appel récursif. Il définit la valeur retournée lorsque le problème est réduit à sa forme minimale et permet de garantir la terminaison de la récursion.
>
> **Un cas récursif :** le cas récursif est la règle de définition d’une fonction qui exprime son résultat à partir d’un ou plusieurs appels à elle-même, appliqués à un problème strictement plus simple que le précédent, afin de garantir l’atteinte du cas d’arrêt et la terminaison de la récursion.
>
> **L'empilement :** L’empilement correspond à la phase durant laquelle chaque appel de fonction est stocké dans la pile d’appels en mémoire, en attente du résultat d’un appel plus profond. Chaque nouvel appel est ajouté au sommet de la pile tant que le cas d’arrêt n’est pas atteint.
> 
> **La remontée de la pile d’appels :** la remontée de la pile d’appels est la phase d’exécution qui commence après l’atteinte du cas d’arrêt d’une fonction récursive. À ce moment, les appels récursifs précédemment empilés sont résolus un par un en sens inverse, chaque appel utilisant le résultat retourné par l’appel suivant pour produire sa propre valeur.

:::warning
Sans cas d’arrêt, la fonction entre dans une boucle infinie.
:::

## 4.1. Étude complète du mécanisme récursif

Prenons l’exemple d’une fonction qui permet de retourner une liste contenant les N premiers éléments d’une liste :

```haskell
-- Computes the number of elements in a list.
length' :: [a] -> Int
length' []      = 0
length' (_ : xs) = 1 + length' xs

-- Returns a list containing the first N elements of a list.
take' :: Int -> [a] -> [a]
take' n x
    | n < 0 = error "Error: invalid index"
    | length' x <= n = x
take' _ [] = []
take' 0 _ = []
take' n (x : xs) = x : take' (n - 1) xs

main = print (take' 3 [5, 10, 15, 20, 25])
```

```haskell
{-
On appelle take' avec la liste [5, 10, 15, 20, 25] et l'index 3.

Soit take' 0 _ = [] défini comme le cas d’arrêt, 
et take' n (x : xs) = x : take' (n - 1) xs défini comme le cas récursif.
-}

take' 3 (5  : [10, 15, 20, 25]) = 5  : take' 2 [10, 15, 20, 25]
take' 2 (10 : [15, 20, 25])     = 10 : take' 1 [15, 20, 25]
take' 1 (15 : [20, 25])         = 15 : take' 0 [20, 25]

--D’après le cas d’arrêt take' 0 (20 : [25]) = []. On effectue ensuite la remontée de la pile :

take' 1 (15 : [20, 25])         = 15 : take' 0 [20, 25]         = 15 : []       = [15]
take' 2 (10 : [15, 20, 25])     = 10 : take' 1 [15, 20, 25]     = 10 : [15]     = [10, 15]
take' 3 (5  : [10, 15, 20, 25]) = 5  : take' 2 [10, 15, 20, 25] = 5  : [10, 15] = [5, 10, 15]

--Donc le résultat finale pour un appel de la fonction take' 3 [5, 10, 15, 20, 25] est [5, 10, 15]
```

Pour mieux comprendre, la fonction `take'` est appelée à chaque fois, et `n` diminue à chaque appel car on l’a définie ainsi :

```haskell
take' (n - 1) xs
```

Un point extrêmement important à comprendre en Haskell est que **la récursivité se termine uniquement lorsqu’une condition d’arrêt est atteinte.** Dans notre exemple, la condition d’arrêt est :

```haskell
take' 0 _ = []
```

Cela signifie que **lorsque `n` atteint 0, Haskell cesse totalement les appels récursifs.** À ce moment précis, Haskell **ne continue plus la descente récursive** mais commence **la remontée de la pile d’appels.** Chaque appel précédent, qui était en attente sous la forme :

`x : take' (n - 1) xs` reçoit alors un résultat fixe à la place de `take' (n - 1) xs`.

Ce remplacement progressif transforme peu à peu les appels récursifs en valeurs concrètes :

```haskell
... = 15 : []       = [15]
... = 10 : [15]     = [10, 15]
... = 5  : [10, 15] = [5, 10, 15]
```

La récursivité n’est donc plus active à ce moment-là : elle est complètement résolue. Donc le résultat final est : `[5, 10, 15]`
