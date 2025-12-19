---
id: concepts-avances-poo
title: 1. Concepts avancés de la programmation orientée objet (POO)
---

# Concepts avancés de la programmation orientée objet (POO)

**La programmation orientée objet** est une façon de programmer qui consiste à organiser le code autour d’objets plutôt que de simples fonctions. Un objet, c’est une sorte de *“chose”* qui représente un élément du monde réel (comme une voiture, un étudiant ou un compte bancaire). Ces objets sont créés à partir de classes, qui servent de modèles. Par exemple, une classe Voiture décrit ce qu’est une voiture, et on peut ensuite créer plusieurs objets de ce type (`ferrari`, `mercedes`, etc...).

## 1.1. Les classes et objets

**Un objet** est une structure de données dynamique qui regroupe des **valeurs nommées appelées propriétés** et des **fonctions appelées méthodes.**

**Une classe** est un modèle ou un plan qui décrit **les caractéristiques (propriétés) et les comportements (méthodes)** que posséderont les objets créés à partir d’elle.

:::info
Dans l’exemple qui suit, ne pas tenir compte des mots `public` et `static` et ni des types. L’important est de se concentrer uniquement sur les explications relatives aux propriétés, aux méthodes et au constructeur.
:::

```java
class Vehicle {
    double weight;
    double enginePower;

    Vehicle(double weight, double enginePower) {
        this.weight = weight;
        this.enginePower = enginePower;
    }

    double calculateSpeed(float seconds) {
        return ((enginePower / weight) * seconds) * 3.6;
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        // `ferrari` est une instance de `Vehicle`
        Vehicle ferrari = new Vehicle(1380, 570);
        System.out.println("La Ferrari après 10 secondes : " + ferrari.calculateSpeed(10) + " km/h");
    }
}
```

`ferrari` est une variable qui référence un objet, autrement dit une **instance** de la classe `Vehicle`. Lorsque l’on parle d’instance, on fait référence à l’objet complet en mémoire, c’est-à-dire à une structure qui regroupe des propriétés et des méthodes :

> **Une instance** désigne le fait que cet objet a été créé à partir d'un modèle (une classe).

**Les propriétés** `weight` et `enginePower`, qui **stockent des données**.

**Les méthodes** `calculateSpeed(...)`, **définit une action** que l’objet peut effectuer.

**Le constructeur** `Vehicle(double weight, double enginePower) {...}` est une méthode spéciale utilisée pour créer une nouvelle instance (ou objet) de type `Vehicle`. Il sert à initialiser les propriétés de l'objet  (`weight` et `enginePower`) avec les valeurs fournies en paramètre, comme dans l’exemple `new Vehicle(1380, 570);`. Ainsi, dès sa création, l’objet contient déjà les informations de l’utilisateur.

## 1.2. Modificateurs d’accès

**Les modificateurs d’accès** permettent de contrôler qui peut accéder à une classe, une méthode, une propriété ou un constructeur. Ils jouent un rôle essentiel pour organiser le code, protéger les données sensibles et structurer la visibilité entre les différentes parties d’un programme.

### 1.2.1. Pour les classes : `public`

| **Modificateur**  | **Description**                                                |
|:------------------|:---------------------------------------------------------------|
| `public`          | La classe est accessible depuis n’importe quelle autre classe. |

```java
public class Vehicle {}
```

```java
public class Main {
    public static void main(String[] args) {
        Vehicle vehicle = new Vehicle();
    }
}
```

---

| **Modificateur**  | **Description**                                                                                   |
|:------------------|:--------------------------------------------------------------------------------------------------|
| *(aucun mot-clé)* | La classe est accessible uniquement depuis les classes du même package (modificateur par défaut). |

:::info
Un package sert à organiser le code (comme des dossiers pour les classes) et à définir des zones de visibilité.

Lorsqu’un fichier Java est placé à la racine de `src/`, il appartient au package par défaut, c’est-à-dire qu’il n’est dans aucun package nommé. Toutes les classes placées à la racine de `src/` seront donc dans ce même package par défaut et pourront s’accéder entre elles sans import particulier.

Pour créer un vrai package, on ajoute un sous-dossier dans `src/`. Donc créer un dossier `example` dans `src`, toutes les classes à l’intérieur devront commencer : `package example;`.
:::

```java
package example;

class Vehicle {}
```

```java
package example;

public class Main {
    public static void main(String[] args) {
        Vehicle vehicle = new Vehicle();
    }
}
```

### 1.2.2. Pour les propriétés, méthodes et constructeurs : `public`, `private` et `protected`

| **Modificateur**  | **Description**                                      |
|:------------------|:-----------------------------------------------------|
| `public`          | Le code est accessible depuis toutes les classes.    |

```java
class Vehicle {
    public double weight;
    public double enginePower;

    public Vehicle(double weight, double enginePower) {
        this.weight = weight;
        this.enginePower = enginePower;
    }

    public double calculateSpeed(float seconds) {
        return ((enginePower / weight) * seconds) * 3.6;
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Vehicle ferrari = new Vehicle(1380, 570);
        System.out.println("La Ferrari après 10 secondes : " + ferrari.calculateSpeed(10) + " km/h");
    }
}
```

---

| **Modificateur**  | **Description**                                                                |
|:------------------|:-------------------------------------------------------------------------------|
| `private`         | Le code est accessible uniquement à l’intérieur de la classe où il est défini. |

```java
class Vehicle {
    private double weight;
    private double enginePower;

    private Vehicle(double weight, double enginePower) {
        this.weight = weight;
        this.enginePower = enginePower;
    }

    private double calculateSpeed(float seconds) {
        return ((enginePower / weight) * seconds) * 3.6;
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Vehicle ferrari = new Vehicle(1380, 570);
        // Erreur de compilation

        System.out.println("La Ferrari après 10 secondes : " + ferrari.calculateSpeed(10) + " km/h");
        // Erreur de compilation
    }
}
```

:::danger
Ici, il est impossible d’instancier un objet lorsque le constructeur de `Vehicle` est privé, et il est également impossible d’appeler une méthode privée depuis une autre classe.
:::

:::info
Pour rendre la classe utilisable, il faut rendre le constructeur et les méthodes publiques. *Cela sera expliqué plus en détail dans la suite, notamment avec le concept de JavaBean, un modèle d’encapsulation dans la section 1.4.*
:::

---

| **Modificateur**  | **Description**                                                                                                                                                         |
|:------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `protected`       | Le code est accessible à l’intérieur de la classe où il est défini, dans le même package, et dans les sous-classes, même si celles-ci appartiennent à un autre package. |

```java
package example;

class Vehicle {
    protected double weight;
    protected double enginePower;

    protected Vehicle (double weight, double enginePower) {
        this.weight = weight;
        this.enginePower = enginePower;
    }

    protected double calculateSpeed(float seconds) {
        return ((enginePower / weight) * seconds) * 3.6;
    }
}

class Car extends Vehicle {

    Car (double weight, double enginePower) {
        super(weight, enginePower);
    }

    protected double calculateSpeed(float seconds) {
        return ((enginePower / weight) * seconds) * 3.6;
    }
}
```

```java
package example;

public class Main {
    public static void main(String[] args) {
        Car ferrari = new Car(1380, 570);
        System.out.println("La Ferrari après 10 secondes : " + ferrari.calculateSpeed(10) + " km/h");
    }
}
```

:::warning
Petite particularité : lorsqu’une méthode est redéfinie dans une sous-classe, on ne peut pas réduire la visibilité de la méthode héritée. C’est une règle fondamentale en Java, ce qui signifie que la méthode redéfinie doit conserver au moins le même niveau d’accès que celle de la classe parente, ou bien l’élargir (par exemple, en la déclarant `protected` ou `public`).
:::

---

| **Modificateur**  | **Description**                                                                               |
|:------------------|:----------------------------------------------------------------------------------------------|
| *(aucun mot-clé)* | Le code est accessible uniquement dans les classes du même package (modificateur par défaut). |

```java
package example;

class Vehicle {
    double weight;
    double enginePower;

    Vehicle (double weight, double enginePower) {
        this.weight = weight;
        this.enginePower = enginePower;
    }

    double calculateSpeed(float seconds) {
        return ((enginePower / weight) * seconds) * 3.6;
    }
}
```

```java
package example;

public class Main {
    public static void main(String[] args) {
        Vehicle ferrari = new Vehicle(1380, 570);
        System.out.println("La Ferrari après 10 secondes : " + ferrari.calculateSpeed(10) + " km/h");
    }
}
```

## 1.3. Modificateurs non liés à l'accès

**Les modificateurs non liés à l’accès** permettent de préciser le comportement, l’héritage ou l’utilisation d’une classe, d’une méthode ou d’une propriété, sans pour autant influencer leur visibilité.

### 1.3.1. Pour les classes : `final` et `abstract`

| **Modificateur** | **Description**                                       |
|:-----------------|:------------------------------------------------------|
| `final`          | Empêche toute autre classe d’hériter de cette classe. |

```java
final class Vehicle {}

class Car extends Vehicle {} // Erreur de compilation
```

---

| **Modificateur** | **Description**                                                 |
|:-----------------|:----------------------------------------------------------------|
| `abstract`       | Interdit la création directe d’objets à partir de cette classe. |

```java
abstract class Vehicle {}
```

```java
public class Main {
    public static void main(String[] args) {
        Vehicle vehicle = new Vehicle(); // Erreur de compilation
    }
}
```

:::warning
Une classe abstraite doit être obligatoirement héritée par une autre classe pour être utilisée :

```java
abstract class Vehicle {}

class Car extends Vehicle {}
```

```java
public class Main {
    public static void main(String[] args) {
        Car car = new Car();
    }
}
```
:::

### 1.3.2. Pour les propriétés et méthodes : `final`, `abstract` et `static`

| **Modificateur** | **Description**                                                                                                                                                                   |
|:-----------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `final`          | Empêche toute modification ou redéfinition : une propriété `final` ne peut être assigné qu’une seule fois et une méthode `final` ne peut pas être redéfinie dans une sous-classe. |

```java
class Vehicle {
    final double weight;
    final double enginePower;

    Vehicle(double weight, double enginePower) {
        this.weight = weight;
        this.enginePower = enginePower;
    }

    final double ferrariWeight() {
        return this.weight = 1380; // Erreur de compilation
    }

    final double calculateSpeed(float seconds) {
        return ((enginePower / weight) * seconds) * 3.6;
    }
}

class Car extends Vehicle {
    Car(double weight, double enginePower) {
        super(weight, enginePower);
    }

    double ferrariWeight() { // Erreur de compilation
        return this.weight;
    }

    double calculateSpeed(float seconds) { // Erreur de compilation
        return ((enginePower / weight) * seconds) * 3.6;
    }
}
```

---

| **Modificateur** | **Description**                                                                                                                                                                                                |
|:-----------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `abstract`       | Utilisé uniquement dans une classe abstraite, et uniquement pour des **méthodes**. Une méthode abstraite ne possède pas de corps (ex. `abstract void run();`). Elle doit être implémentée dans la sous-classe. |

```java
abstract class Vehicle {
    abstract void startEngine(); // Méthode abstraite : pas de corps
}

class Car extends Vehicle {
    void startEngine() {
        System.out.println("La voiture a démarré !");
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Car ferrari = new Car();
        ferrari.startEngine();
    }
}
```

---

| **Modificateur** | **Description**                                                                  |
|:-----------------|:---------------------------------------------------------------------------------|
| `static`         | Associe la propriété ou la méthode à la classe elle-même, et non à une instance. |


```java
class Vehicle {
    static String category;

    static double releaseDate(double date) {
        return date;
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Vehicle ferrari = new Vehicle();
        Vehicle lamborghini = new Vehicle();
        Vehicle.category = "A1";

        System.out.println("Date de sortie des voitures : " + Vehicle.releaseDate(2024));
        System.out.println("Catégorie de la Ferrari : " + ferrari.category);
        System.out.println("Catégorie de la Lamborghini : " + lamborghini.category);
    }
}
```

:::warning
Même si on écrit `ferrari.category = "A2";`, la valeur changera aussi pour l’objet `lamborghini`. En effet, une propriété `static` est partagée par tous les objets de la classe : elle n’appartient pas à une instance, mais à la classe elle-même.
:::

## 1.4. JavaBean : modèle d'encapsulation pour structurer de données

**L'encapsulation** est une règle essentielle en programmation orientée objet. Elle consiste à protéger les données internes d’un objet en les rendant inaccessibles directement depuis l’extérieur.

**Un JavaBean** est une classe Java qui respecte un ensemble de conventions spécifiques, et qui est principalement conçue pour encapsuler des données. Il s’agit d’un objet standardisé, largement utilisé pour faciliter la gestion et l’échange de données, notamment au sein de frameworks comme Spring.

Pour être considéré comme un JavaBean, une classe doit **posséder un constructeur sans argument, définir ses propriétés `private`, et fournir des méthodes `public` de type getter et setter pour accéder ou modifier ces propriétés :**

```java
public class Vehicle {
    private double weight;
    private double enginePower;

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getEnginePower() {
        return enginePower;
    }

    public void setEnginePower(double enginePower) {
        this.enginePower = enginePower;
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Vehicle Ferrari = new Ferrari();

        Ferrari.setWeight(1380);
        Ferrari.setEnginePower(570);
        double weight = Ferrari.getWeight();
        double power = Ferrari.getEnginePower();
    }
}
```

## 1.5. Le polymorphisme : héritage, liaison dynamique et overloading

```java
public class Vehicle {
    private double weight;
    private double enginePower;

    public Vehicle(double weight, double enginePower) {
        this.weight = weight;
        this.enginePower = enginePower;
    }

    public double calculateSpeed(float seconds) {
        return ((enginePower / weight) * seconds) * 3.6;
    }
}

class Car extends Vehicle {
    public Car(double weight, double enginePower) {
        super(weight, enginePower);
    }

    public double calculateSpeed(float seconds) {
        return super.calculateSpeed(seconds);
    }
}

class Truck extends Vehicle {
    public Truck(double weight, double enginePower) {
        super(weight, enginePower);
    }

    public double calculateSpeed(float seconds) {
        return super.calculateSpeed(seconds);
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Vehicle ferrari = new Car(1380, 570);
        Vehicle mercedes = new Truck(11700, 625);

        System.out.println("La Ferrari après 10 secondes : " + ferrari.calculateSpeed(10) + " km/h");
        System.out.println("La Mercedes après 10 secondes : " + mercedes.calculateSpeed(10) + " km/h");
    }
}
```

**L'héritage** permet à une sous-classe de réutiliser les propriétés et méthodes d'une super-classe :

```java
class Car extends Vehicle {...}

class Truck extends Vehicle {...}
```

Le mot-clé `extends` signifie *"hérite de"*, c’est-à-dire que les classes `Car`et `Truck` héritent des propriétés et méthodes de la super-classe `Vehicle`. Autrement dit les classes `Car` et `Truck` sont des sous-classes de la super-classe `Vehicle`.

**La liaison dynamique** est un mécanisme qui détermine quelle méthode redéfinie (overriding) doit être exécutée au moment de l’exécution, selon le type réel de l’objet référencé. Elle permet d’appeler la bonne méthode même si la variable est de type parent, mais que l’objet réel appartient à une sous-classe.

:::info
**L’overriding** est un mécanisme qui permet à une sous-classe de fournir sa propre implémentation d’une méthode déjà définie dans la classe parente. La méthode redéfinie doit avoir **le même nom, les mêmes paramètres et le même type de retour** que celle du parent.

La classe `Vehicle` définit :

```java
public double calculateSpeed(float seconds) { ... }
```

Dans les sous-classes `Car` et `Truck`, la même méthode est redéfinie :

```java
public double calculateSpeed(float seconds) {
    return super.calculateSpeed(seconds);
}
```
:::

**L’overloading** est un mécanisme qui détermine quelle méthode appeler en fonction des paramètres passés. Il permet de définir plusieurs méthodes avec le même nom, mais avec des paramètres différents. Ce choix est fait au moment de la compilation, ce qui permet au compilateur de savoir exactement quelle version de la méthode exécuter.

```java
public class Vehicle {
    private double weight;
    private double enginePower;

    public Vehicle(double weight, double enginePower) {
        this.weight = weight;
        this.enginePower = enginePower;
    }

    public double calculateSpeed(float seconds) {
        return ((enginePower / weight) * seconds) * 3.6;
    }

    public double calculateSpeed(float seconds, double traction) {
        return ((enginePower / weight) * seconds) * 3.6 * traction;
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Vehicle ferrari = new Vehicle(1380, 570);

        System.out.println("La Ferrari avec adhérence après 10 secondes : " + ferrari.calculateSpeed(10, 0.9) + " km/h");
    }
}
```

**Le polymorphisme** est le concept global qui dit qu’un même objet peut avoir plusieurs comportements différents selon le contexte. Il est rendu possible grâce à la combinaison de l’overloading (polymorphisme statique) et de la liaison dynamique (polymorphisme dynamique).
