---
id: haskell
title: Haskell
---

# Haskell

<span style={{color: "#0f62fe"}}>**Haskell**</span> est un langage de programmation fonctionnel et repose entièrement sur le paradigme fonctionnel. Cela signifie que le programme est construit à partir de fonctions mathématiques, et non à partir d’instructions exécutées étape par étape.

À l’inverse du langage C, qui est basé sur **la programmation impérative** consistant à donner des instructions successives à l’ordinateur en modifiant les valeurs des variables, **la programmation fonctionnelle** repose principalement sur l’utilisation de fonctions, comme en mathématiques.

## 1. Compilation, exécution et mode interactif en Haskell

Il existe deux principales manières de travailler en Haskell : avec le compilateur **GHC** ou avec l’interpréteur **GHCi**.

**GHC (Glasgow Haskell Compiler) : compilation en programme exécutable**

GHC est le compilateur officiel du langage Haskell. Il permet de transformer un fichier `.hs` en un programme exécutable, tout en vérifiant les erreurs de type. Le fichier généré peut ensuite être lancé comme un logiciel.

```
ghc Main.hs
./Main
```

**GHCi : exécution interactive du code**

GHCi est la version interactive de GHC. Il permet de tester du code directement en ligne de commande, d’exécuter des instructions ligne par ligne, d’effectuer des calculs rapides, et d’apprendre tout en expérimentant facilement.

```
ghci
Prelude> 1 + 1
2
```

## 2. Types et déclaration de variables

| **Type**   | **Description**                    |
|:-----------|:-----------------------------------|
| `Int`      | Nombre entier limité               |
| `Integer`  | Nombre entier illimité             |
| `Float`    | Nombre décimal (simple précision)  |
| `Double`   | Nombre décimal (double précision)  |
| `Bool`     | Valeur logique (`True` ou `False`) |
| `Char`     | Un seul caractère                  |
| `String`   | Chaîne de caractères               |

### 2.1. Déclaration d'une variable sans et avec type explicite

**Un type explicite** correspond à un type que l’on spécifie directement lors de la déclaration de la variable. Lorsqu’aucun type n’est précisé, le compilateur détermine automatiquement le type de la variable. Il est cependant recommandé de déclarer les types de manière explicite afin d’améliorer la lisibilité et la fiabilité du code.

**Sans type explicite :**

```haskell
x = 200

main = print x
```

Dans ce cas, Haskell **déduit automatiquement le type** de la variable.

**Avec type explicite :**

Pour déclarer une variable avec un type explicite, il faut utiliser la syntaxe avec `::`, suivie du type que l’on assigne à la variable :

```haskell
x :: Int
x = 200

main = print x
```

Ici, on indique clairement que `x` est de type `Int`.

:::info
Il est nécessaire d’utiliser la fonction `main` pour compiler et exécuter un programme Haskell. Les variables et les fonctions sont définies dans le fichier, et l’affichage du résultat se fait à l’aide de `print`.
:::

### 2.2. Déclaration locale avec `let ... in`

Le mot `in` signifie : *“dans”*. Il sert à séparer la définition de la variable de l’expression dans laquelle elle est utilisée.

```haskell
main = print (let x = 200 in x * x * x)
```

:::warning
La variable définie avec `let` n’est accessible **que dans la partie située après** `in`. En dehors de cette expression, elle n’existe plus. Ainsi, soit on utilise directement l’expression dans la fonction `main`, soit on stocke son résultat dans une variable, par exemple :

```haskell
cube :: Int
cube = let x = 200 in x * x * x

main = print cube
```
:::

## 3. Déclaration et signature de type d’une fonction

Pour déclarer une fonction, on doit écrire **une signature de type complète**, c’est-à-dire ce que la fonction prend en entrée et ce qu’elle retourne :

```haskell
func :: Int -> Int
func x = x * x * x

main = print (func 200)
```

Ici, la fonction `cube` prend un `Int` en entrée et retourne un `Int`. La signature de type s’écrit sous la forme : `function :: Input -> Output`. L’écriture `cube x =` signifie que l’on définit la fonction en utilisant la variable `x`, suivie de l’expression qui donne le résultat.

## 4. Les types polymorphes

**Les types polymorphes** permettent d’écrire des fonctions capables de fonctionner avec n’importe quel type de donnée, sans connaître ce type à l’avance.

```haskell
func :: a -> a
func a = a
    
main = print (func "Bob")
```

Dans cet exemple, la fonction `func` s’adapte automatiquement au type de la valeur qu’on lui passe en argument.

:::info
Il est également possible d’utiliser des types polymorphes avec des tuples, des listes et des classes de types. Ces notions seront expliquées plus en détail dans les parties suivantes.
:::

## 5. Classes de types et contraintes de typage

Une classe de types regroupe des types qui partagent un même ensemble d’opérations :

| **Classe de types** | **Description**                                                                                | **Instances**                                                                 |
|:--------------------|:-----------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------|
| `Num`               | Regroupe les types sur lesquels on peut faire des opérations arithmétiques (`+`, `-`, `*`, …)  | `Int`, `Integer`, `Float`, `Double`                                           |
| `Eq`                | Regroupe les types dont les valeurs peuvent être comparées avec `==` et `/=`                   | `Int`, `Integer`, `Float`, `Double`, `Char`, `Bool`, `String`, listes, tuples |
| `Ord`               | Regroupe les types que l’on peut ordonner (`<`, `>`, `<=`, `>=`)                               | `Int`, `Integer`, `Float`, `Double`, `Char`, `Bool`, `String`                 |
| `Show`              | Regroupe les types que l’on peut convertir en texte pour l’affichage                           | `Int`, `Integer`, `Float`, `Double`, `Char`, `Bool`, `String`, listes, tuples |
| `Read`              | Regroupe les types que l’on peut lire à partir d’une chaîne de caractères                      | `Int`, `Integer`, `Float`, `Double`, `Char`, `Bool`, `String`                 |
| `Enum`              | Regroupe les types dont on peut énumérer les valeurs                                           | `Int`, `Integer`, `Char`, `Bool`                                              |
| `Bounded`           | Regroupe les types possédant une valeur minimale et une valeur maximale                        | `Int`, `Char`, `Bool`, `Ordering`                                             |
| `Integral`          | Regroupe les types représentant des nombres entiers                                            | `Int`, `Integer`                                                              |
| `Floating`          | Regroupe les types représentant des nombres décimaux                                           | `Float`, `Double`                                                             |
| `Functor`           | Regroupe les types sur lesquels on peut appliquer une transformation avec `fmap`               | listes (`[]`), `Maybe`, `Either`, `IO`                                        |

### 5.1. Contraindre les types avec l’opérateur `=>`

Une contrainte de type permet de limiter les types utilisables par une fonction grâce aux classes de types. L’opérateur `=>` sépare à gauche, les contraintes sur les types et à droite, le type proprement dit de la fonction.

```haskell
cube :: Num a => a -> a
cube x = x * x * x

equals :: Eq a => a -> a -> Bool
equals x y = x == y

main :: IO ()
main = do
  print (cube 200)
  print (equals 200 200)
```

:::info
À noter qu'il est possible d’imposer plusieurs contraintes à la fois sur un même type :

```haskell
equals :: (Eq a, Num a) => a -> a -> Bool
equals x y = x == y

main = print (equals 200 200)
```
:::

## 6. Les conditions

En Haskell, les conditions peuvent s’écrire principalement de deux manières : avec la forme classique `if` / `then` / `else` ou avec les guards.

### 6.1. Conditions avec `if` / `then` / `else` 

La forme classique d’une condition utilise obligatoirement les mots-clés `if`, `then` et `else`. Contrairement à d’autres langages, le `else` est toujours requis, car une condition est une expression qui doit forcément retourner une valeur.

```haskell
isNeg :: (Num a, Ord a) => a -> Bool
isNeg a =
    if a < 0 then True else False
    
main = print (isNeg(-200))
```

:::warning
La valeur `0` appartient obligatoirement à la classe de types `Num`. C’est pour cette raison que la contrainte `Num a` est nécessaire dans la signature de type.
:::

### 6.2. Conditions avec les guards

**Les guards** sont une autre manière très lisible d’écrire des conditions en Haskell. Ils permettent d’exprimer plusieurs cas à l’aide de conditions successives. 

```haskell
isNeg :: (Num a, Ord a) => a -> Bool
isNeg a
    | a < 0 = True
    | otherwise = False
    
main = print (isNeg(-200))
```

Dans les guards, le symbole `|` signifie *"si"*, tandis que l’expression située après le signe `=` correspond à *"alors"*. Le mot-clé `otherwise` lui représente le cas *"sinon"* et correspond, par défaut, à la valeur `True`. Haskell évalue les conditions de haut en bas et s’arrête dès qu’une condition est vérifiée.

:::danger
Lorsqu’on définit une fonction avec des guards, on ne met pas de signe `=` après le nom de la fonction. Le `=` est utilisé directement dans chaque garde :

```haskell
isNeg a
    | ...
    | otherwise = ...
```
:::

### 6.3. Le pattern matching

Le **pattern matching** permet de reconnaître la forme d’une valeur et d’agir en fonction de cette forme. Contrairement aux `if` et aux guards, il ne repose pas sur des conditions booléennes, mais sur la structure des données. On indique directement : *si la valeur a cette forme, alors on fait ceci.*

```haskell
func :: Int -> Int
func 0 = 0
func x = x * x * x

main = print (func 0)
```

Ici, on a la forme `func 0`. Si l’on appelle la fonction avec 0, alors on dit que le résultat est égal à 0. Sinon, la valeur est stockée dans x et la fonction retourne son cube.

## 7. Les tuples

Un tuple est une structure de données qui permet de regrouper plusieurs valeurs dans une seule variable, tout en conservant leur ordre. Les valeurs d’un tuple peuvent être de types différents.

```haskell
pair :: a -> b -> (a, b)
pair a b = (a, b)

main = print (pair 200 400)
```

Ici, l’appel `pair 200 400` produit le tuple `(200,400)`, qui contient deux valeurs ordonnées regroupées dans une même structure.

:::info
À noter qu'un tuple peut contenir 2, 3, 4 valeurs ou plus, mais sa taille est toujours fixe.
:::

## 8. Les listes

### 8.1. Construire une liste : méthode bas niveau et écriture simplifiée

Pour construire une liste en Haskell, on peut utiliser plusieurs méthodes. **La première méthode** est dite *“bas niveau”*. Elle consiste à comprendre comment une liste est réellement construite en interne. Cette construction se fait à l’aide de l’opérateur `:` appelé cons (le constructeur de liste).

Pour faire simple, en Haskell, construire une liste revient à relier un élément au reste de la liste avec `:`, élément par élément.

```haskell
list :: [Int]
list = 200 : 400 : 600 : []

main = print list
```

Si on analyse de plus près, on voit qu’en réalité la liste est construite de droite à gauche, en partant toujours de la liste vide `[]`, qui représente la fin de la liste :

> Insertion de 600 dans la liste vide = `[600]`
> 
> Insertion de 400 dans la liste = `[400, 600]`
> 
> Insertion de 200 dans la liste = `[200, 400, 600]`

**La deuxième méthode** est une méthode plus standardisée, utilisée pour simplifier l’écriture du code :

```haskell
list :: [Int]
list = [200, 400, 600]

main = print list
```

En réalité, derrière cette écriture, on retrouve exactement la méthode précédente. Elle est simplement masquée par une syntaxe plus lisible, afin de rendre le code plus clair et plus facile à écrire.

:::warning
À noter que, dans le cas d’une fonction en Haskell, il n’est pas nécessaire de préciser que la variable `a` est une liste, car son type est déjà défini dans la signature de la fonction comme étant une liste d’entiers. Ainsi, lorsque le paramètre est passé à la fonction, on sait automatiquement qu’il s’agit d’une liste. Il suffit donc de lui donner un nom de variable (comme `a`, par exemple), qui représente bien une liste d’entiers :

```haskell
list :: [Int] -> [Int]
list a = a

main = print (list [200, 400, 600])
```
:::

### 8.2. Extraction d’une sous-liste à l’aide du cons `:`

Pour accéder à un élément précis dans une liste, on peut utiliser le principe du cons `:` avec une petite subtilité : il est nécessaire d’utiliser des parenthèses pour le pattern matching.

```haskell
list :: [Int] -> [Int]
list (a : b : c) = c

main = print (list [200, 400, 600, 800])
```

Dans cet exemple : 

> a = `200`
> 
> b = `400`
> 
> c = `[600, 800]`
 
Donc la fonction retourne une liste à partir du troisième élément, soit : `[600, 800]`

### 8.3. Utilisation du wildcard `_` pour ignorer des éléments dans une liste

Si l’on souhaite retourner uniquement la valeur du troisième élément, on peut utiliser le joker (wildcard) `_`, qui signifie *"je ne m’intéresse pas à cette valeur"*. Il permet ainsi d’ignorer les éléments précédents de la liste :

```haskell
list :: [Int] -> Int
list (_ : _ : c : _) = c

main = print (list [200, 400, 600, 800])
```

Ici, les valeurs `200`, `400` et `800` sont ignorées grâce au joker `_`. La variable `c`, quant à elle, correspond au troisième élément de la liste, c’est-à-dire `600`.
