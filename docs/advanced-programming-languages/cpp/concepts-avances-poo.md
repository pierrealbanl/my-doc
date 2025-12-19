---
id: concepts-avances-poo
title: 1. Concepts avancés de la programmation orientée objet (POO)
---

# Concepts avancés de la programmation orientée objet (POO)

**La programmation orientée objet** est une façon de programmer qui consiste à organiser le code autour d’objets plutôt que de simples fonctions. Un objet, c’est une sorte de *“chose”* qui représente un élément du monde réel comme une *voiture, un étudiant ou un compte bancaire.*

## 1.1. Les classes et objets

**Un objet** est une structure de données qui regroupe des **valeurs nommées appelées propriétés** et des **fonctions appelées méthodes.**

**Une classe** est un modèle ou un plan qui décrit **les caractéristiques (propriétés) et les comportements (méthodes)** que posséderont les objets créés à partir d’elle.

:::info
Dans l’exemple qui suit, ne pas tenir compte du mot `public`. L’important est de se concentrer uniquement sur les explications relatives aux propriétés, aux méthodes et au constructeur.
:::

```cpp
#include <iostream>

class Vehicle {
public:
    // Les propriétés `weight` et `enginePower` stockent des données
    double weight, enginePower;

    /* Le constructeur `Vehicle(...)` est une méthode spéciale utilisée pour
     * créer une nouvelle instance (ou objet) de type `Vehicle`.
     * Il sert à initialiser les propriétés de l'objet avec les valeurs fournies
     * en paramètre, comme dans l’exemple `Vehicle ferrari(1380, 570);`.
     */
    Vehicle(double weight, double enginePower) {
        this->weight = weight;
        this->enginePower = enginePower;
    }

    // La méthode `calculateSpeed(...)`, définit une action que l’objet peut effectuer
    double calculateSpeed(float seconds) {
        return ((enginePower / weight) * seconds) * 3.6;
    }
};

int main() {
    // `ferrari` est une instance de `Vehicle`
    Vehicle ferrari(1380, 570);
    std::cout << "Vitesse après 10 secondes : " << ferrari.calculateSpeed(10) << " km/h\n";
}
```

`ferrari` est une variable qui représente directement un objet, autrement dit une **instance** de la classe `Vehicle`. Lorsque l’on parle d’instance, on fait référence à l’objet complet en mémoire, c’est-à-dire à une structure qui regroupe des propriétés et des méthodes :

> **Une instance** désigne le fait que cet objet a été créé à partir d'un modèle (une classe).
