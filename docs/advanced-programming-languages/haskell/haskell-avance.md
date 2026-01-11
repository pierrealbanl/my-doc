---
id: haskell-avance
title: 5. Haskell avancé
---

# Haskell avancé

## 5.1. Définition de types algébriques avec `data`

```haskell
data Vehicle = Ferrari 
    | Mercedes 
    | Lamborghini
    deriving Eq
```

> `data` permet de définir les formes possibles d’une valeur.
> 
> `deriving` permet de demander au compilateur de générer automatiquement du code lors de la compilation.

Dans notre cas, `data Vehicle` signifie : *voici toutes les formes que le type `Vehicle` peut prendre* et `deriving Eq` génère le code nécessaire pour comparer les différentes valeurs du type `Vehicle` et déterminer si deux valeurs sont identiques ou non.

```
ghci> Ferrari == Lamborghini
False

ghci> Ferrari == Ferrari
True
```

### 5.1.1. Types algébriques paramétrés et instance manuelle

```haskell
data Classes = S_Supercar 
    | C_Cross_Country
    deriving (Eq, Show)

data Vehicle = Ferrari Classes 
    | Mercedes Classes 
    | Lamborghini Classes 
    deriving Eq

instance Show Vehicle where
    show (Ferrari S_Supercar) = "Ferrari 458 Italia V8 4.5L"
    show (Mercedes C_Cross_Country) = "Mercedes Classe G 63 AMG V8 4.0L"
    show (Lamborghini S_Supercar) = "Lamborghini Aventador V12 6.5L"
    show _ = "Unknown vehicle!"
```

> Une instance dit comment un type se comporte pour une classe de type donnée.
> 
> `where` introduit le contenu de l’instance, c’est-à-dire les fonctions que tu dois définir.
> 
> Donc `instance ... where` signifie : *pour le type X, voilà comment fonctionne la classe de type Y.*

Dans notre cas pour une instance de `Show`, l’implémentation consiste toujours à définir la fonction `show`.

```
ghci> Ferrari S_Supercar
Ferrari 458 Italia V8 4.5L

ghci> Mercedes C_Cross_Country
Mercedes Classe G 63 AMG V8 4.0L

ghci> Mercedes S_Supercar
Unknown vehicle

ghci> Lamborghini S_Supercar
Lamborghini Aventador V12 6.5L
```
