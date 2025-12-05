---
id: conditions
title: 2. Les conditions
---

# Les conditions

En Haskell, les conditions peuvent s’écrire principalement de deux manières : avec la forme classique `if` / `then` / `else` ou avec les guards.

## 2.1. Conditions avec `if` / `then` / `else`

La forme classique d’une condition utilise obligatoirement les mots-clés `if`, `then` et `else`. Contrairement à d’autres langages, le `else` est toujours requis, car une condition est une expression qui doit forcément retourner une valeur.

```haskell
isNeg :: (Num a, Ord a) => a -> Bool
isNeg x =
    if x < 0 then True else False
    
main = print (isNeg(-5))
```

:::warning
La valeur `0` appartient obligatoirement à la classe de types `Num`. C’est pour cette raison que la contrainte `Num a` est nécessaire dans la signature de type.
:::

## 2.2. Conditions avec les guards

**Les guards** sont une autre manière très lisible d’écrire des conditions en Haskell. Ils permettent d’exprimer plusieurs cas à l’aide de conditions successives.

```haskell
isNeg :: (Num a, Ord a) => a -> Bool
isNeg x
    | x < 0 = True
    | otherwise = False
    
main = print (isNeg(-5))
```

Dans les guards, le symbole `|` signifie *"si"*, tandis que l’expression située après le signe `=` correspond à *"alors"*. Le mot-clé `otherwise` lui représente le cas *"sinon"* et correspond, par défaut, à la valeur `True`. Haskell évalue les conditions de haut en bas et s’arrête dès qu’une condition est vérifiée.

:::danger
Lorsqu’on définit une fonction avec des guards, on ne met pas de signe `=` après le nom de la fonction. Le `=` est utilisé directement dans chaque garde :

```haskell
isNeg x
    | ...
    | otherwise = ...
```
:::

## 2.3. Le pattern matching

Le **pattern matching** permet de reconnaître la forme d’une valeur et d’agir en fonction de cette forme. Contrairement aux `if` et aux guards, il ne repose pas sur des conditions booléennes, mais sur la structure des données. On indique directement : *si la valeur a cette forme, alors on fait ceci.*

```haskell
func :: Int -> Int
func 0 = 0
func x = x * x * x

main = print (func 0)
```

Ici, on a la forme `func 0`. Si l’on appelle la fonction avec 0, alors on dit que le résultat est égal à 0. Sinon, la valeur est stockée dans x et la fonction retourne son cube.
