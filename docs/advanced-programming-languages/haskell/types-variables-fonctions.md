---
id: types-variables-fonctions
title: 1. Types, variables et fonctions
---

# Types, variables et fonctions

## 1.1. Types et déclaration de variables

| **Type**   | **Description**                    |
|:-----------|:-----------------------------------|
| `Int`      | Nombre entier limité               |
| `Integer`  | Nombre entier illimité             |
| `Float`    | Nombre décimal (simple précision)  |
| `Double`   | Nombre décimal (double précision)  |
| `Bool`     | Valeur logique (`True` ou `False`) |
| `Char`     | Un seul caractère                  |
| `String`   | Chaîne de caractères               |

### 1.1.1. Déclaration d'une variable sans et avec type explicite

En Haskell, si aucun type n’est indiqué, le compilateur détermine automatiquement le type de la variable. Il est cependant recommandé de déclarer les types de manière explicite afin d’améliorer la lisibilité et la fiabilité du code.

**Sans type explicite :**

```haskell
n = 5

main = print n
```

**Avec type explicite :**

Pour déclarer une variable avec un type explicite, il faut utiliser la syntaxe avec `::`, suivie du type que l’on assigne à la variable :

```haskell
n :: Int
n = 5

main = print n
```

:::info
Il est nécessaire d’utiliser la fonction `main` pour compiler et exécuter un programme Haskell. Les variables et les fonctions sont définies dans le fichier, et l’affichage du résultat se fait à l’aide de `print`.
:::

### 1.1.2. Déclaration locale avec `let ... in`

Le mot `in` signifie : *dans*. Il sert à séparer la définition de la variable de l’expression dans laquelle elle est utilisée.

```haskell
main = print (let n = 5 in n * n * n)
```

:::warning
La variable définie avec `let` n’est accessible **que dans la partie située après** `in`. En dehors de cette expression, elle n’existe plus. Ainsi, soit on utilise directement l’expression dans la fonction `main`, soit on stocke son résultat dans une variable, par exemple :

```haskell
cube :: Int
cube = let n = 5 in n * n * n

main = print cube
```
:::

## 1.3. Déclaration et signature de type d’une fonction

Pour déclarer une fonction, on doit écrire **une signature de type complète**, c’est-à-dire ce que la fonction prend en entrée et ce qu’elle retourne :

```haskell
func :: Int -> Int
func n = n * n * n

main = print (func 5)
```

Ici, la fonction `func` prend un `Int` en entrée et retourne un `Int`. La signature de type s’écrit sous la forme : `function :: Input -> Output`. L’écriture `func x =` signifie que l’on définit la fonction en utilisant la variable `x`, suivie de l’expression qui donne le résultat.

:::info
`n` n’est pas une variable modifiable comme dans les autres langages, mais le paramètre de la fonction `func`, c’est-à-dire le nom donné à la valeur passée en argument, et cette valeur ne peut pas être modifiée.
:::

## 1.4. Les types polymorphes

**Les types polymorphes** permettent d’écrire des fonctions capables de fonctionner avec n’importe quel type de donnée, sans connaître ce type à l’avance.

```haskell
func :: a -> a
func x = x
    
main = print (func "Bob")
```

Dans cet exemple, la fonction `func` s’adapte automatiquement au type de la valeur qu’on lui passe en argument.

:::info
Il est également possible d’utiliser des types polymorphes avec des tuples, des listes et des classes de types. Ces notions seront expliquées plus en détail dans les parties suivantes.
:::

## 1.5. Classes de types et contraintes de typage

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

### 1.5.1. Contraindre les types avec l’opérateur `=>`

Une contrainte de type permet de limiter les types utilisables par une fonction grâce aux classes de types. L’opérateur `=>` sépare à gauche, les contraintes sur les types et à droite, le type proprement dit de la fonction.

```haskell
cube :: Num a => a -> a
cube x = x * x * x

equals :: Eq a => a -> a -> Bool
equals x y = x == y

main :: IO ()
main = do
  print (cube 5)
  print (equals 5 10)
```

:::info
À noter qu'il est possible d’imposer plusieurs contraintes à la fois sur un même type :

```haskell
equals :: (Eq a, Num a) => a -> a -> Bool
equals x y = x == y

main = print (equals 5 10)
```
:::

## 1.6. Le type `Maybe` : approche explicite de la gestion des erreurs

:::info
*Cette section traite de la récursivité. Il est recommandé d’y revenir uniquement après avoir vu et compris ce concept, présenté dans la section 4.*
:::

Il existe plusieurs façons de gérer les cas d’erreur. La plus simple consiste à les traiter au cas par cas. Toutefois, pour rendre le code plus explicite en Haskell, on peut utiliser une autre approche : le type `Maybe`. 

`Maybe` est un type qui indique, dès la signature d’une fonction, qu’un résultat peut être manquant. Il permet ainsi de rendre les fonctions plus sûres en gérant explicitement les cas d’échec.

```haskell
-- Function from Length.hs
length' :: [a] -> Int
length' [] = 0
length' (_ : xs) = 1 + length' xs

safeIndexOf :: [a] -> Int -> Maybe a -- --> Maybe a signifie : potentiellement une valeur de type a.
safeIndexOf [] _ = Nothing -- --> Nothing représente l’absence de valeur.
safeIndexOf x n
    | n >= length' x || n < 0 = Nothing -- --> Nothing représente l’absence de valeur.
safeIndexOf (x : _) 0 = Just x -- --> Just indique qu’une valeur de type a est bien présente.
safeIndexOf (_ : xs) n = safeIndexOf xs (n - 1)

main = print (safeIndexOf [5, 10, 15, 20] 3)
```
