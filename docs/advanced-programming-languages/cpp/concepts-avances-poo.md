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
*Dans cette section, il n’est pas nécessaire de prêter attention aux mots-clés `public`, qui est un modificateur. Cette notion sera abordée plus loin, dans la section 1.3.1.*
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

## 1.2. Le polymorphisme : héritage, liaison dynamique et overloading

:::info
*Dans cette section, il n’est pas nécessaire de prêter attention aux mots-clés `public`, `private` et `override`, qui sont des modificateurs. Cette notion sera abordée plus loin, dans la section 1.3.1. et 1.4.3.*
:::

```cpp title="Vehicle.h"
#ifndef VEHICLE_H
    #define VEHICLE_H

    class Vehicle {
    private:
        double weight, enginePower;
    public:
        Vehicle(double weight, double enginePower);

        // Évite les problèmes de ressources non libérées, les fuites mémoire et les comportements indéfinis
        virtual ~Vehicle() = default;
        // `virtual` permet de choisir la méthode à appeler au moment de l’exécution
        virtual double calculateSpeed(float seconds);
    };

    // Déclaration de la classe `Car` héritant publiquement de `Vehicle`
    class Car : public Vehicle {
    public:
        Car(double weight, double enginePower);
        double calculateSpeed(float seconds) override;
    };

    // Déclaration de la classe `Truck` héritant publiquement de `Vehicle`
    class Truck : public Vehicle {
    public:
        Truck(double weight, double enginePower);
        double calculateSpeed(float seconds) override;
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

double Car::calculateSpeed(float seconds) {
    return Vehicle::calculateSpeed(seconds);
}

Truck::Truck(double weight, double enginePower)
    : Vehicle(weight, enginePower) {}

double Truck::calculateSpeed(float seconds) {
    return Vehicle::calculateSpeed(seconds);
}
```

```cpp title="main.cpp"
#include <iostream>
#include "Vehicle.h"

int main() {
    // `ferrari` est un pointeur de type `Vehicle` vers un objet de type `Car`
    Vehicle *ferrari = new Car(1380, 570);
    
    // `mercedes` est un pointeur de type `Vehicle` vers un objet de type `Truck`
    Vehicle *mercedes = new Car(11700, 625);

    std::cout << "Vitesse après 10 secondes : " << ferrari->calculateSpeed(10) << " km/h\n";
    std::cout << "Vitesse après 10 secondes : " << mercedes->calculateSpeed(10) << " km/h\n";

    delete ferrari;
    delete mercedes;
}
```

**L'héritage** permet à une sous-classe de réutiliser les propriétés et méthodes d'une super-classe :

```cpp
class Car : public Vehicle { ... };

class Truck : public Vehicle { ... };
```

Le mot-clé `public Vehicle` signifie *"hérite de"*, c’est-à-dire que les classes `Car`et `Truck` héritent des propriétés et méthodes de la super-classe `Vehicle`. Autrement dit les classes `Car` et `Truck` sont des sous-classes de la super-classe `Vehicle`.

**La liaison dynamique** est un mécanisme qui détermine quelle méthode redéfinie (overriding) doit être exécutée au moment de l’exécution, selon le type réel de l’objet référencé. Elle permet d’appeler la bonne méthode même si la variable est de type parent, mais que l’objet réel appartient à une sous-classe. 

Par défaut, **la liasion n'est pas dynamique elle est static.** L’utilisation du mot-clé `virtual` permet d’activer la liaison dynamique : la méthode appelée est choisie à l’exécution selon le type réel de l’objet, même si celui-ci est manipulé via une référence d'une super-classe.

:::info
**L’overriding** est un mécanisme qui permet à une sous-classe de fournir sa propre implémentation d’une méthode déjà définie dans la classe parente. La méthode redéfinie doit avoir **le même nom, les mêmes paramètres et le même type de retour** que celle du parent.

La classe `Vehicle` définit :

```cpp
double Vehicle::calculateSpeed(float seconds) {...}
```

Dans les sous-classes `Car` et `Truck`, la même méthode est redéfinie :

```cpp
double Car::calculateSpeed(float seconds) {
    return Vehicle::calculateSpeed(seconds);
}

double Truck::calculateSpeed(float seconds) {
    return Vehicle::calculateSpeed(seconds);
}
```
:::

:::info
**L’overloading** est un mécanisme qui détermine quelle méthode appeler en fonction des paramètres passés. Il permet de définir plusieurs méthodes avec le même nom, mais avec des paramètres différents. Ce choix est fait au moment de la compilation, ce qui permet au compilateur de savoir exactement quelle version de la méthode exécuter.

```cpp title="Vehicle.h"
#ifndef VEHICLE_H
    #define VEHICLE_H

    class Vehicle {
    private:
        double weight, enginePower;
    public:
        Vehicle(double weight, double enginePower);

        double calculateSpeed(float seconds);
        double calculateSpeed(float seconds, double traction);
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

double Vehicle::calculateSpeed(float seconds, double traction) {
    return ((enginePower / weight) * seconds) * 3.6 * traction;
}
```

```cpp title="main.cpp"
#include <iostream>
#include "Vehicle.h"

int main() {
    // `ferrari` est une instance de `Vehicle`
    Vehicle *ferrari = new Vehicle(1380, 570);

    std::cout << "Vitesse après 10 secondes : " << ferrari->calculateSpeed(10) << " km/h\n";

    delete ferrari;
}
```
:::

**Le polymorphisme** est le concept global qui dit qu’un même objet peut avoir plusieurs comportements différents selon le contexte. Il est rendu possible grâce à la combinaison de l’overloading (polymorphisme statique) et de la liaison dynamique (polymorphisme dynamique).

## 1.3. Modificateurs d’accès

**Les modificateurs d’accès** permettent de contrôler qui peut accéder à une méthode, une propriété ou un constructeur. Ils jouent un rôle essentiel pour organiser le code, protéger les données sensibles et structurer la visibilité entre les différentes parties d’un programme.

### 1.3.1. Pour les propriétés, méthodes et constructeurs : `public`, `private` et `protected`

| **Modificateur**  | **Description**                                                                                                                         |
|:------------------|:----------------------------------------------------------------------------------------------------------------------------------------|
| `public`          | Le code est accessible depuis n’importe quel autre fichier, à condition que la déclaration de la classe soit visible via un `#include`. |

```cpp title="Vehicle.h"
#ifndef VEHICLE_H
    #define VEHICLE_H

    class Vehicle {
    public:
        double weight, enginePower;
        Vehicle(double weight, double enginePower);

        virtual ~Vehicle() = default;
        virtual double calculateSpeed(float seconds);
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
```

```cpp title="main.cpp"
#include <iostream>
#include "Vehicle.h"

int main() {
    Vehicle *ferrari = new Vehicle(1380, 570);

    std::cout << "Vitesse après 10 secondes : " << ferrari->calculateSpeed(10) << " km/h\n";

    delete ferrari;
}
```

---

| **Modificateur**  | **Description**                                                                |
|:------------------|:-------------------------------------------------------------------------------|
| `private`         | Le code est accessible uniquement à l’intérieur de la classe où il est défini. |

```cpp title="Vehicle.h"
#ifndef VEHICLE_H
    #define VEHICLE_H

    class Vehicle {
    private:
        double weight, enginePower;
        Vehicle(double weight, double enginePower);

        virtual ~Vehicle() = default;
        virtual double calculateSpeed(float seconds);
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
```

```cpp title="main.cpp"
#include <iostream>
#include "Vehicle.h"

int main() {
    // Erreur de compilation
    Vehicle *ferrari = new Vehicle(1380, 570);

    // Erreur de compilation
    std::cout << "Vitesse après 10 secondes : " << ferrari->calculateSpeed(10) << " km/h\n";

    // Erreur de compilation
    delete ferrari;
}
```

:::danger
Ici, il est impossible d’instancier un objet lorsque le constructeur de `Vehicle` est privé, et il est également impossible d’appeler une méthode privée depuis une autre classe.
:::

---

| **Modificateur**  | **Description**                                                                                                                                                      |
|:------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `protected`       | Le code est accessible à l’intérieur de la classe où il est défini et dans les sous-classes. Il n’est pas accessible depuis l’extérieur de la hiérarchie de classes. |

:::info
*Dans cette partie, il n’est pas nécessaire de prêter attention aux mots-clés `override`, qui est un modificateur. Cette notion sera abordée plus loin, dans la section 1.4.3.*
:::

```cpp title="Vehicle.h"
#ifndef VEHICLE_H
    #define VEHICLE_H

    class Vehicle {
    protected:
        double weight, enginePower;
        Vehicle(double weight, double enginePower);
        
    // Une méthode publique est nécessaire pour exploiter la liaison dynamique        
    public:
        virtual ~Vehicle() = default;
        virtual double calculateSpeed(float seconds);
    };

    class Car : public Vehicle {
    public:
        Car(double weight, double enginePower);
        double calculateSpeed(float seconds) override;
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

double Car::calculateSpeed(float seconds) {
    return Vehicle::calculateSpeed(seconds);
}
```

```cpp title="main.cpp"
#include <iostream>
#include "Vehicle.h"

int main() {
    Vehicle *ferrari = new Car(1380, 570);

    std::cout << "Vitesse après 10 secondes : " << ferrari->calculateSpeed(10) << " km/h\n";

    delete ferrari;
}
```

Les membres déclarés `protected` (méthodes, propriétés ou constructeurs) ne sont pas accessibles directement depuis l’extérieur de la classe. Ils sont destinés à être utilisés à l’intérieur de la classe elle-même ou par les classes qui en héritent. En pratique, un membre `protected` sert souvent de mécanisme intermédiaire : une méthode ou une propriété interne utilisée par d’autres méthodes, publiques ou non, afin de structurer la logique de la classe tout en permettant son extension par héritage.

## 1.4. Modificateurs non liés à l'accès

**Les modificateurs non liés à l’accès** permettent de préciser le comportement, l’héritage ou l’utilisation d’une classe, d’une méthode ou d’une propriété, sans pour autant influencer leur visibilité.

### 1.4.1. Pour les classes : `final`

| **Modificateur** | **Description**                                       |
|:-----------------|:------------------------------------------------------|
| `final`          | Empêche toute autre classe d’hériter de cette classe. |

```cpp title="Vehicle.h"
#ifndef VEHICLE_H
    #define VEHICLE_H

    class Vehicle final {
    };

    // Erreur de compilation
    class Car : public Vehicle {
    };

#endif // VEHICLE_H
```

### 1.4.2. Pour les propriétés : `static` et `const`

| Modificateur | Description                                                                                          |
|:-------------|:-----------------------------------------------------------------------------------------------------|
| `static`     | Associe la propriété à la classe elle-même : une seule valeur est partagée par toutes les instances. |
| `const`      | Rend la propriété immuable après son initialisation : sa valeur ne peut plus être modifiée.          |


```cpp title="Vehicle.h"
#ifndef VEHICLE_H
    #define VEHICLE_H

    class Vehicle {
    public:
        static double weight;
        const double enginePower;
        Vehicle(double enginePower);

        virtual ~Vehicle() = default;
        virtual double calculateSpeed(float seconds);
    };

#endif // VEHICLE_H
```

```cpp title="Vehicle.cpp"
#include "Vehicle.h"

Vehicle::Vehicle(double enginePower)
    : enginePower(enginePower) {}

double Vehicle::weight = 1380;

double Vehicle::calculateSpeed(float seconds) {

    return ((enginePower / weight) * seconds) * 3.6;
}
```

```cpp title="main.cpp"
#include <iostream>
#include "Vehicle.h"

int main() {
    Vehicle *ferrari = new Vehicle(570);

    std::cout << "Vitesse après 10 secondes : " << ferrari->calculateSpeed(10) << " km/h\n";

    delete ferrari;
}
```

### 1.4.3. Pour les méthodes : `override`, `final`, `static` et `const`

| **Modificateur** | **Description**                                                              |
|:-----------------|:-----------------------------------------------------------------------------|
| `override`       | Indique qu’une méthode redéfinit une méthode virtuelle de la classe parente. |

```cpp title="Vehicle.h"
#ifndef VEHICLE_H
    #define VEHICLE_H

    class Vehicle {
    public:
        double weight, enginePower;
        Vehicle(double weight, double enginePower);
        double calculateSpeed(float seconds);
    };

    class Car : public Vehicle {
    public:
        Car(double weight, double enginePower);
        double calculateSpeed(float seconds) override;
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

double Car::calculateSpeed(float seconds) {
    return Vehicle::calculateSpeed(seconds);
}
```

```cpp title="main.cpp"
#include <iostream>
#include "Vehicle.h"

int main() {
    Vehicle *ferrari = new Car(1380, 570);

    std::cout << "Vitesse après 10 secondes : " << ferrari->calculateSpeed(10) << " km/h\n";

    delete ferrari;
}
```

Lorsqu’une méthode virtuelle est redéfinie dans une sous classe, il ne s’agit pas de créer une nouvelle méthode indépendante, mais de fournir une implémentation spécifique d’une méthode définie dans la classe parente.

---

| **Modificateur** | **Description**                                                                                                   |
|:-----------------|:------------------------------------------------------------------------------------------------------------------|
| `final`          | Empêche toute modification ou redéfinition : une méthode `final` ne peut pas être redéfinie dans une sous-classe. |

```cpp title="Vehicle.h"
#ifndef VEHICLE_H
    #define VEHICLE_H

    class Vehicle {
    public:
        double weight, enginePower;
        Vehicle(double weight, double enginePower);

        virtual ~Vehicle() = default;
        virtual double calculateSpeed(float seconds) final; // Erreur de compilation
    };

    class Car : public Vehicle {
    public:
        Car(double weight, double enginePower);
        double calculateSpeed(float seconds) override; // Erreur de compilation
    };

#endif // VEHICLE_H
```

---

| **Modificateur** | **Description**                                                                  |
|:-----------------|:---------------------------------------------------------------------------------|
| `static`         | Associe la propriété ou la méthode à la classe elle-même, et non à une instance. |

```cpp
#include <iostream>
#include <string>

class Vehicle {
public:
    static std::string category;

    static double releaseDate(double date) {
        return date;
    }
};

std::string Vehicle::category = "";

int main() {
    Vehicle *ferrari = new Vehicle();
    Vehicle *lamborghini = new Vehicle();
    Vehicle::category = "A1";

    std::cout << "Date de sortie des voitures : " << ferrari->releaseDate(2024) << "\n";
    std::cout << "Catégorie de la Ferrari : " << ferrari->category << "\n";
    std::cout << "Catégorie de la Lamborghini : " << lamborghini->category << "\n";

    delete ferrari;
    delete lamborghini;
}
```

---

| **Modificateur** | **Description**                                                  |
|:-----------------|:-----------------------------------------------------------------|
| `const`          | Indique qu’une méthode ne modifie pas l’état interne de l’objet. |

```cpp title="Vehicle.h"
#ifndef VEHICLE_H
    #define VEHICLE_H

    class Vehicle {
    public:
        double weight, enginePower;
        Vehicle(double weight, double enginePower);

        virtual ~Vehicle() = default;
        virtual double calculateSpeed(float seconds) const;
    };

#endif // VEHICLE_H
```

```cpp title="Vehicle.cpp"
#include "Vehicle.h"

Vehicle::Vehicle(double weight, double enginePower)
    : weight(weight), enginePower(enginePower) {}

double Vehicle::calculateSpeed(float seconds) const {
    // Erreur de compilation
    enginePower = 500;
    return ((enginePower / weight) * seconds) * 3.6;
}
```

```cpp title="main.cpp"
#include <iostream>
#include "Vehicle.h"

int main() {
    Vehicle *ferrari = new Vehicle(1380, 570);

    std::cout << "Vitesse après 10 secondes : " << ferrari->calculateSpeed(10) << " km/h\n";

    delete ferrari;
}
```
