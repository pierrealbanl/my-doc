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

```
x = 200

main = print x
```

Dans ce cas, Haskell **déduit automatiquement le type** de la variable.

**Avec type explicite :**

Pour déclarer une variable avec un type explicite, il faut utiliser la syntaxe avec `::`, suivie du type que l’on assigne à la variable :

```
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

```
main = print (let x = 200 in x * x * x)
```

:::warning
La variable définie avec `let` n’est accessible **que dans la partie située après** `in`. En dehors de cette expression, elle n’existe plus. Ainsi, soit on utilise directement l’expression dans la fonction `main`, soit on stocke son résultat dans une variable, par exemple :

```
cube :: Int
cube = let x = 200 in x * x * x

main = print cube
```
:::

## 3. Déclaration et signature de type d’une fonction

Pour déclarer une fonction, on doit écrire **une signature de type complète**, c’est-à-dire ce que la fonction prend en entrée et ce qu’elle retourne :

```
f :: Int -> Int
f x = x * x * x

main = print (f 200)
```

Ici, la fonction `f` prend un `Int` en entrée et retourne un `Int`. La signature de type s’écrit sous la forme : `function :: Input -> Output`. L’écriture `f x =` signifie que l’on définit la fonction en utilisant la variable `x`, suivie de l’expression qui donne le résultat.
