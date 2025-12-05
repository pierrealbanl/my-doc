---
id: recursivite
title: 4. La récursivité
---

# La récursivité

**La récursivité** est un mécanisme qui permet de définir une fonction qui s’appelle elle-même afin de résoudre un problème étape par étape. La récursivité est particulièrement adaptée à la manipulation des listes, car celles-ci sont naturellement définies de façon récursive : **soit une liste est vide, soit elle est composée d’une tête et d’une sous-liste.**

Pour qu’une fonction récursive fonctionne correctement, deux éléments sont indispensables :

> **Un cas d’arrêt** : il permet d’arrêter la récursion.
>
> **Un cas récursif** : il définit comment la fonction se rappelle elle-même en se rapprochant du cas d’arrêt.

:::warning
Sans cas d’arrêt, la fonction entre dans une boucle infinie.
:::

Prenons l’exemple d’une fonction qui permet de retourner l’élément situé à un indice donné dans une liste :

```haskell
-- Computes the number of elements in a list.
length' :: [a] -> Int
length' []      = 0
length' (_ : y) = 1 + length' y

-- Returns the element at a given index in a list.
indexOf :: [a] -> Int -> a
indexOf [] _ = error "Error: the list is empty"
indexOf x i
    | i >= length' x || i < 0 = error "Error: invalid index"
indexOf (x : _) 0 = x
indexOf (_ : y) i = indexOf y (i - 1)

main = print (indexOf [5, 10, 15, 20] 3)
```

Dans cet exemple : `indexOf (x : _) 0 = x` est le cas d’arrêt et `indexOf (_ : y) i = indexOf y (i - 1)` est le cas récursif. Pour comprendre le cheminement, voici une explication détaillée :

On appelle `indexOf` avec la liste `[5, 10, 15, 20]` et l'index `3`:

```
indexOf (5 : [10, 15, 20]) = indexOf [10, 15, 20] 2
indexOf (10 : [15, 20])    = indexOf [15, 20] 1
indexOf (15 : [20])        = indexOf [20] 0
```

On atteint alors le cas d’arrêt : `indexOf (x : _) 0 = x`. Donc le résultat final est : `20`
