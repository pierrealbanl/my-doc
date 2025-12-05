---
id: introduction
title: Introduction
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
