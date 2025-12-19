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

Pour créer une classe, on définit d’abord sa déclaration dans un fichier d’en-tête `.h`. Cette déclaration décrit la structure de la classe : ses propriétés, ses méthodes et ses constructeurs. Le fichier `.h` ne contient que cette description, sans implémentation :

```cpp title="Vehicle.h"
#ifndef VEHICLE_H
    #define VEHICLE_H

    class Vehicle {
    public:
        // Les propriétés `weight` et `enginePower` stockent des données
        double weight, enginePower;

        /* Le constructeur `Vehicle(...)` est une méthode spéciale utilisée pour
         * créer une nouvelle instance (ou objet) de type `Vehicle`.
         * Il sert à initialiser les propriétés de l'objet avec les valeurs fournies
         * en paramètre, comme dans l’exemple `new Vehicle(1380, 570);`.
         */
        Vehicle(double weight, double enginePower);
        
        // La méthode `calculateSpeed(...)`, définit une action que l’objet peut effectuer
        double calculateSpeed(float seconds);
    };

#endif // VEHICLE_H
```

Le comportement réel des méthodes (et l’initialisation des propriétés) est ensuite implémenté dans un fichier source `.cpp` :

```cpp title="Vehicle.cpp"
#include "Vehicle.h"

Vehicle::Vehicle(double weight, double enginePower)
    : weight(weight), enginePower(enginePower) {}

double Vehicle::calculateSpeed(float seconds) {
    return ((enginePower / weight) * seconds) * 3.6;
}
```

Une fois la classe définie, il est possible de créer une instance de la classe `Vehicle` :

```cpp title="main.cpp"
#include <iostream>
#include "Vehicle.h"

int main() {
    // `ferrari` est une instance de `Vehicle`
    Vehicle ferrari(1380, 570);
    std::cout << "Vitesse après 10 secondes : " << ferrari.calculateSpeed(10) << " km/h\n";
}
```

`ferrari` est une variable qui représente directement un objet, autrement dit une **instance** de la classe `Vehicle`. Lorsque l’on parle d’instance, on fait référence à l’objet complet en mémoire, c’est-à-dire à une structure qui regroupe des propriétés et des méthodes :

> **Une instance** désigne le fait que cet objet a été créé à partir d'un modèle (une classe).

## 1.2. Modificateurs d’accès

**Les modificateurs d’accès** permettent de contrôler qui peut accéder à une classe, une méthode, une propriété ou un constructeur. Ils jouent un rôle essentiel pour organiser le code, protéger les données sensibles et structurer la visibilité entre les différentes parties d’un programme.

### 1.2.1. Pour les propriétés, méthodes et constructeurs : `public`, `private` et `protected`

| **Modificateur**  | **Description**                                                                                                                         |
|:------------------|:----------------------------------------------------------------------------------------------------------------------------------------|
| `public`          | Le code est accessible depuis n’importe quel autre fichier, à condition que la déclaration de la classe soit visible via un `#include`. |

| **Modificateur**  | **Description**                                                                |
|:------------------|:-------------------------------------------------------------------------------|
| `private`         | Le code est accessible uniquement à l’intérieur de la classe où il est défini. |

| **Modificateur**  | **Description**                                                                                                                                                      |
|:------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `protected`       | Le code est accessible à l’intérieur de la classe où il est défini et dans les sous-classes. Il n’est pas accessible depuis l’extérieur de la hiérarchie de classes. |

```cpp title="Vehicle.h"
#ifndef VEHICLE_H
    #define VEHICLE_H

    class Vehicle {
    protected:
        double weight, enginePower;
    public:
        Vehicle(double weight, double enginePower);
        double calculateSpeed(float seconds);
    };

    class Car : public Vehicle {
    public:
        Car(double weight, double enginePower);
    };

#endif // VEHICLE_H
```

```cpp title="Vehicle.cpp"
#include "Vehicle.h"

Vehicle::Vehicle(double weight, double enginePower)
    : weight(weight), enginePower(enginePower) {}

double Vehicle::calculateSpeed(float seconds) {
    return ((enginePower / weight) * seconds) * 3.6;
}

Car::Car(double weight, double enginePower)
    : Vehicle(weight, enginePower) {}
```

```cpp title="main.cpp"
#include <iostream>
#include "Vehicle.h"

int main() {
    // `ferrari` est une instance de `Vehicle`
    Vehicle ferrari(1380, 570);
    std::cout << "Vitesse après 10 secondes : " << ferrari.calculateSpeed(10) << " km/h\n";
}
```

```cpp
#include <iostream>
#include "Vehicle.h"

int main() {
    Car ferrari(1380, 570);
    std::cout << "Vitesse après 10 secondes : " << ferrari.calculateSpeed(10) << " km/h\n";
}
```
