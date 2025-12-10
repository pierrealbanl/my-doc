---
id: structures-de-donnees
title: 3. Les structures de données
---

# Les structures de données

## 3.1. Les tuples

Un tuple est une structure de données qui permet de regrouper plusieurs valeurs dans une seule variable, tout en conservant leur ordre. Les valeurs d’un tuple peuvent être de types différents.

```haskell
pair :: a -> b -> (a, b)
pair x y = (x, y)

main = print (pair 5 10)
```

Ici, l’appel `pair 5 10` produit le tuple `(5, 10)`, qui contient deux valeurs ordonnées regroupées dans une même structure.

:::info
À noter qu'un tuple peut contenir 2, 3, 4 valeurs ou plus, mais sa taille est toujours fixe.
:::

## 3.2. Les listes

### 3.2.1. Construire une liste : méthode bas niveau et écriture simplifiée

Pour construire une liste en Haskell, on peut utiliser plusieurs méthodes. **La première méthode** est dite *“bas niveau”*. Elle consiste à comprendre comment une liste est réellement construite en interne. Cette construction se fait à l’aide de l’opérateur `:` appelé cons (le constructeur de liste).

Pour faire simple, en Haskell, construire une liste revient à relier un élément au reste de la liste avec `:`, élément par élément.

```haskell
list :: [Int]
list = 5 : 10 : 15 : []

main = print list
```

Si on analyse de plus près, on voit qu’en réalité la liste est construite de droite à gauche, en partant toujours de la liste vide `[]`, qui représente la fin de la liste :

> Insertion de 15 dans la liste vide = `[15]`
>
> Insertion de 10 dans la liste = `[10, 15]`
>
> Insertion de 5 dans la liste = `[5, 10, 15]`

**La deuxième méthode** est une méthode plus standardisée, utilisée pour simplifier l’écriture du code :

```haskell
list :: [Int]
list = [5, 10, 15]

main = print list
```

En réalité, derrière cette écriture, on retrouve exactement la méthode précédente. Elle est simplement masquée par une syntaxe plus lisible, afin de rendre le code plus clair et plus facile à écrire.

### 3.2.2. Extraire des éléments précis d’une liste avec l’opérateur `:`

Il est essentiel de savoir comment extraire des éléments précis d’une liste. Pour cela, on utilise l’opérateur de construction `:` (appelé cons). Une règle importante à respecter est l’usage des parenthèses, qui permettent de décomposer correctement la structure de la liste.

```haskell
list :: [Int] -> [Int]
list (x : xs) = xs

main = print (list [5, 10, 15, 20, 25])
```

Dans cet exemple : x = `5` ; xs = `[10, 15, 20, 25]`. Donc la fonction retourne une liste à partir du deuxième élément, soit : `[10, 15, 20, 25]`

### 3.2.3. Extraire un élément précis d’une liste avec `:` et `_`

Si l’on souhaite retourner uniquement la valeur d’un élément précis, on peut utiliser le joker (wildcard) `_`, qui signifie *"je ne m’intéresse pas à cette valeur"*. Il permet ainsi d’ignorer les éléments précédents de la liste :

```haskell
list :: [Int] -> Int
list (_ : _ : z : _) = z

main = print (list [5, 10, 15, 20])
```

Ici, les valeurs `5`, `10` et le reste de la liste`[20]` sont ignorées grâce au joker `_`. La variable `z`, quant à elle, correspond au troisième élément de la liste, c’est-à-dire `15`.
