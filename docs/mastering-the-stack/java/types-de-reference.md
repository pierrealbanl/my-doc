---
id: types-de-reference
title: 2. Les types de référence
---

# Les types de référence

Une variable de **type de référence** ne contient pas directement la valeur de la donnée, mais une référence, c’est-à-dire une sorte **d’adresse mémoire** qui pointe vers un objet stocké ailleurs. Lorsque l’on manipule une variable de type de référence, on ne manipule donc pas la donnée elle-même, mais un lien vers celle-ci. Contrairement aux types primitifs, les types de référence peuvent posséder des méthodes, des propriétés, et peuvent être hérités ou implémenter des interfaces.

## 2.1 Types primitifs vs classes Wrapper

En Java, un type définit la nature d’une donnée, les valeurs qu’elle peut prendre et les opérations qu’on peut lui appliquer. On distingue les **types primitifs**, qui stockent directement des valeurs en mémoire, et les **classes wrapper**, qui stockent des adresses pointant vers des objets.

| **Type primitif** | **Taille (bits)** | **Classe wrapper** | **Description**                                            |
| :---------------- | :---------------- | :----------------- | :--------------------------------------------------------- |
| `int`             | 32                | `Integer`          | Entier relatif (de -2³¹ à 2³¹-1)                           |
| `long`            | 64                | `Long`             | Entier relatif long (de -2⁶³ à 2⁶³-1)                      |
| `float`           | 32                | `Float`            | Nombre réel en virgule flottante simple précision          |
| `double`          | 64                | `Double`           | Nombre réel en virgule flottante double précision          |
| `char`            | 16                | `Character`        | Caractère Unicode (un seul symbole, codé sur 16 bits)      |
| `boolean`         | (dépend VM)       | `Boolean`          | Valeur logique (`true` ou `false`)                         |
| `void`            | —                 | `Void`             | Absence de valeur de retour (uniquement pour les méthodes) |

Les **types primitifs** ne sont pas des objets, ce qui signifie qu’ils ne possèdent pas de méthodes. À l’inverse, les **classes wrapper** sont des classes spéciales qui encapsulent les types primitifs. Elles permettent donc de manipuler ces valeurs comme des objets et offrent, en plus, des méthodes utilitaires utiles, par exemple pour faire des comparaisons ou encore transformer une chaîne de caractères en valeur numérique.

:::warning
Petite particularité : `void` n’est pas un type de valeur utilisable pour des variables. Il s’emploie uniquement comme type de retour, signifiant *“aucune valeur”*.
:::

###  2.1.1. Tableau récapitulatif : des méthodes statiques dans les classes Wrapper

| **Méthode statique**                                                              | **Wrapper**                                       | **Description**                                                                           |
|:----------------------------------------------------------------------------------|:--------------------------------------------------|:------------------------------------------------------------------------------------------|
| `parseInt()`, `parseDouble()`, `parseFloat()`, `parseLong()`                      | Numériques (`Integer`, `Long`, `Float`, `Double`) | Transforment une **chaîne de caractères** en une valeur primitive.                        |
| `valueOf()`                                                                       | Tous                                              | Transforme une **chaîne de caractères** ou une **valeur primitive** en un objet wrapper.  |
| `toString(type)`                                                                  | Tous                                              | Transforme un **primitif** en une chaîne de caractères.                                   |

```java
public class Main {
    public static void main(String[] args) {
        int i = Integer.parseInt("5");
        System.out.println(i);

        Integer j = Integer.valueOf(5);
        System.out.println(j);

        String s = Integer.toString(5);
        System.out.println(s);
    }
}
```

###  2.1.2. Tableau récapitulatif : des méthodes d’instances dans les classes Wrapper

| **Méthode d’instance**                                       | **Wrapper**                                             | **Description**                                                                                                                   |
|:-------------------------------------------------------------|:--------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------|
| `toString()`                                                 | Tous                                                    | Transforme **l’objet wrapper** en une chaîne de caractères.                                                                       |
| `equals()`                                                   | Tous                                                    | Compare le contenu de deux **objets wrapper** et retourne un résultat booléen (`true` si les valeurs sont égales, `false` sinon). |
| `hashCode()`                                                 | Tous                                                    | Transforme **l’objet wrapper** en un code numérique (utile pour les tables de hachage).                                           |
| `intValue()`, `doubleValue()`, `floatValue()`, `longValue()` | Numériques <br/>(`Integer`, `Long`, `Float`, `Double`)  | Transforment **l’objet wrapper** en une valeur primitive.                                                                         |
| `compareTo()`                                                | Tous                                                    | Compare deux **objets wrapper** du même type (`0` si égal, `<0` si plus petit, `>0` si plus grand).                               |

```java
public class Main {
    public static void main(String[] args) {
        Integer i = 5;
        String s1 = i.toString();
        System.out.println(s1);

        Integer j = 10;
        System.out.println(j.equals(i));

        String s2 = "Hello World!";
        int hashCode = s2.hashCode();
        System.out.println(hashCode);

        long k = i.longValue();
        System.out.println(k);

        System.out.println(i.compareTo(j));
    }
}
```

## 2.2. Classe fondamentale de Java : `String`

`String` est une classe du package `java.lang` utilisée pour représenter des chaînes de caractères. En Java, une chaîne de caractères est un objet de type String, et non un simple tableau de caractères.

```java
String s = "Hello World!";
```

| **Méthode d’instance**            | **Description**                                                                                              |
|:----------------------------------|:-------------------------------------------------------------------------------------------------------------|
| `length()`                        | Renvoie la **longueur** d’une chaîne de caractères (nombre total de caractères).                             |
| `charAt(int i)`                   | Retourne le **caractère** situé à la position indiquée dans une chaîne de caractères (l’index commence à 0). |
| `substring(int i, int j)`         | Extrait une **sous-chaîne de caractères** comprise entre les indices `start` (inclus) et `end` (exclu).      |
| `equals(Object obj)`              | Compare **le contenu** de deux chaînes de caractères et retourne `true` si elles sont identiques.            |
| `toUpperCase()` / `toLowerCase()` | Convertit une chaîne de caractères en **majuscules** ou en **minuscules**.                                   |
| `compareTo(String s)`             | Compare deux chaînes de caractères selon l’**ordre alphabétique** (résultat négatif, nul ou positif).        |
| `concat(String s)`                | Concatène une chaîne de caractères avec une autre et renvoie le **résultat combiné**.                        |

```java
public class Main {
    public static void main(String[] args) {
        String s = "Hello World";

        System.out.println(s.length());
        System.out.println(s.charAt(3));
        System.out.println(s.substring(0, 5));
        System.out.println(s.equals("hello world"));
        System.out.println(s.toUpperCase());
        System.out.println(s.compareTo("Hello Bob!"));
        System.out.println(s.concat("!"));
    }
}
```

## 2.3. `Object`, la superclasse universelle en Java

La classe `Object` occupe une place essentielle dans la hiérarchie des types de référence. Elle constitue la superclasse de toutes les classes. Autrement dit, toute classe qu’elle provienne de la bibliothèque standard ou qu’elle soit définie par le programmeur hérite implicitement de `Object`, même si cette relation n’est pas explicitement mentionnée dans le code.

Par exemple, la déclaration suivante :

```java
public class Vehicle {...}
```

est équivalente à :

```java
public class Vehicle extends Object {...}
```

Même sans la mention `extends Object`, le compilateur Java l’ajoute automatiquement. Ainsi, puisque toutes les classes dérivent de `Object`, chaque instance en Java possède un ensemble minimal de méthodes communes définies dans cette classe, telles que `toString()` ou `equals(Object obj)`.

## 2.4. Les interfaces : `interface`

**Une interface** est un contrat qui définit un ensemble de méthodes que les classes qui l’implémentent doivent fournir.

```java
interface VehicleBehavior {
    void start();
    void stop();
}

public class Vehicle implements VehicleBehavior {
    public void start() {
        System.out.println("La voiture démarre !");
    }

    public void stop() {
        System.out.println("La voiture s'arrête.");
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Vehicle ferrari = new Vehicle();

        ferrari.start();
        ferrari.stop();
    }
}
```

:::info
`implements` permet à une classe de promettre qu’elle va fournir le code des méthodes définies dans une interface.
:::

:::warning
En Java, il est recommandé de placer chaque interface dans son propre fichier. Mettre une interface et une classe dans le même fichier est considéré comme une mauvaise pratique.

```java title="VehicleBehavior.java"
public interface VehicleBehavior {
    void start();
    void stop();
}
```
:::

### 2.4.1. Les interfaces multiple

Java permet à une classe d’implémenter plusieurs interfaces, contrairement à l’héritage simple entre classes.

```java title="VehicleBehavior.java"
public interface VehicleBehavior {
    void start();
    void stop();
}
```

```java title="ElectricBehavior.java"
public interface ElectricBehavior {
    void chargeBattery();
}
```

Il suffit de séparer les interfaces par une virgule lors de leur déclaration :

```java
public class Vehicle implements VehicleBehavior, ElectricBehavior {
    public void start() {
        System.out.println("Le véhicule démarre !");
    }

    public void stop() {
        System.out.println("Le véhicule s'arrête.");
    }

    public void chargeBattery() {
        System.out.println("La batterie est en charge...");
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Vehicle tesla = new Vehicle();

        tesla.start();
        tesla.stop();
        tesla.chargeBattery();
    }
}
```

## 2.5. Les énumérations : `enum`

`enum` est un type spécial qui permet de définir un ensemble fixe de constantes nommées. Il est souvent utilisé pour représenter des valeurs possibles d’un même concept par exemple les états d’un processus.

```java title="VehicleStatus.java"
public enum VehicleStatus {
    AVAILABLE,
    IN_USE,
    MAINTENANCE,
    UNAVAILABLE
}
```

```java
public class Main {
    public static void main(String[] args) {
        VehicleStatus status = VehicleStatus.MAINTENANCE;
        System.out.println(status);
    }
}
```

Les énumérations peuvent contenir des méthodes, ce qui permet d’ajouter du comportement et de donner plus de sens à leurs valeurs dans certains contextes :

```java title="VehicleStatus.java"
public enum VehicleStatus {
    AVAILABLE,
    IN_USE,
    MAINTENANCE,
    UNAVAILABLE;

    public boolean isOperational() {
        return this == AVAILABLE;
    }
}
```

```java
public class Vehicle {
    private VehicleStatus status;

    public Vehicle(VehicleStatus status) {
        this.status = status;
    }

    public boolean isOperational() {
        return status.isOperational();
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Vehicle ferrari = new Vehicle(VehicleStatus.MAINTENANCE);
        System.out.println("La Ferrari est opérationnelle : " + ferrari.isOperational());
    }
}
```

## 2.6. Les types génériques

Les types génériques (`T`, ou n’importe quel autre nom de paramètre de type comme `E`, `K`, `V`, etc.) sont des paramètres qui peuvent être remplacés par n’importe quel type réel (classe ou interface) lors de la création de l’objet.

| Symbole  | Signification | Exemple       |
|:---------|:--------------|:--------------|
| `T`      | Type          | `Box<T>`      |
| `E`      | Element       | `List<E>`     |
| `K`, `V` | Key, Value    | `Map<K, V>`   |

```java
public class Vehicle<T> {
    private T weight;
    private T enginePower;

    public Vehicle(T weight, T enginePower) {
        this.weight = weight;
        this.enginePower = enginePower;
    }

    public T getWeight() {
        return weight;
    }

    public T getEnginePower() {
        return enginePower;
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Vehicle<Integer> ferrari = new Vehicle(1380, 570);
        System.out.println("Le poid de la Ferrari : " + ferrari.getWeight());
        System.out.println("La puissance de la Ferrari : " + ferrari.getEnginePower());
    }
}
```

:::info
Dans notre contexte, étant donné que les propriétés weight et enginePower correspondent à des valeurs entières, il est nécessaire d’indiquer le type générique Integer au moment de l’instanciation de l’objet `Vehicle<Integer>`.
:::

:::warning
À noter que les opérations arithmétiques ne sont pas possibles avec les types génériques, puisque le compilateur ne peut pas savoir si le type utilisé correspond à un nombre ou non. En effet, un paramètre générique peut représenter tout type d’objet.

```java
public class Vehicle<T> {
    private T weight;
    private T enginePower;

    public Vehicle(T weight, T enginePower) {
        this.weight = weight;
        this.enginePower = enginePower;
    }

    public T calculateSpeed(float seconds) {
        return ((enginePower / weight) * seconds) * 3.6; // Erreur de compilation
    }
}
```
:::

## 2.7. Les structures de données

Les structures de données servent à stocker et organiser les informations de façon à les rendre plus faciles et rapides à exploiter. 

| Interface | Classe       | Particularités                                                 | Doublons autorisés  | Ordre conservé | Accès rapide              |
| :-------- | :----------- | :------------------------------------------------------------- | :------------------ | :------------- | :------------------------ |
| `List`    | `ArrayList`  | Tableau redimensionnable, accès par index                      | Oui                 | Oui            | Oui                       |
| `Set`     | `HashSet`    | Éléments uniques, non ordonnés                                 | Non                 | Non            | Oui                       |
| `List`    | `LinkedList` | Éléments reliés entre eux (chaque nœud pointe vers le suivant) | Oui                 | Oui            | Non (parcours séquentiel) |
| `Map`     | `HashMap`    | Chaque clé est unique et associée à une valeur                 | Non (pour les clés) | Non            | Oui (par clé)             |

### 2.7.1. Les tableaux

**Un tableau** est une structure de données permettant de stocker plusieurs valeurs du même type dans une seule variable. Chaque valeur est accessible grâce à un indice numérique, qui commence toujours à 0.

Il existe deux manières principales de créer un tableau :

```java
public class Main {
    public static void main(String[] args) {
        int[] n = new int[3];
        n[0] = 10;
        n[1] = 15;
        n[2] = 20;

        for (int i = 0; i < n.length; i++) {
            System.out.println(n[i]);
        }
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        int[] n = {10, 15, 20};

        for (int i = 0; i < n.length; i++) {
            System.out.println(n[i]);
        }
    }
}
```

### 2.7.2. Liste dynamique ordonnée : `ArrayList`

`ArrayList` est une classe qui représente une liste dynamique d’éléments (comme un tableau, mais qui peut changer de taille). Les principales méthodes disponibles pour manipuler une `ArrayList` sont : `add`, `get`, `set`, `size`, `remove` et `clear` :

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> vehicle = new ArrayList<>();

        vehicle.add("Ferrari");
        vehicle.add("Mercedes");
        vehicle.add("Lamborghini");
        System.out.println("Les véhicules disponibles dans la liste : " + vehicle);

        System.out.println(vehicle.get(0));

        vehicle.set(2, "Audi");
        System.out.println("Les véhicules disponibles dans la liste : " + vehicle);

        System.out.println("La taille de la liste est " + vehicle.size());

        vehicle.remove(1);
        vehicle.remove(1);
        System.out.println("Les véhicules disponibles dans la liste : " + vehicle);

        vehicle.clear();
        System.out.println("Les véhicules disponibles dans la liste : " + vehicle);
    }
}
```

Par ailleurs, la classe `Collections` propose la méthode `sort()` qui permet de trier une `ArrayList` en ordre alphabétique ou numérique.

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Collections;

public class Main {
    public static void main(String[] args) {
        List<String> vehicle = new ArrayList<>();

        vehicle.add("Ferrari");
        vehicle.add("Mercedes");
        vehicle.add("Lamborghini");

        Collections.sort(vehicle);
        System.out.println("Les véhicules disponibles dans la liste après le tri : " + vehicle);
    }
}
```

###  2.7.3. Ensemble non ordonné d’éléments uniques : `HashSet`

La classe `HashSet` est une structure de données qui permet de stocker une collection d’éléments uniques, sans ordre particulier. Contrairement à une `ArrayList`, un `HashSet` ne conserve pas l’ordre d’insertion et n’autorise pas les doublons.

Les principales méthodes disponibles pour manipuler un `HashSet` sont : `add`, `contains`, `size`, `remove` et `clear` :

```java
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Set<String> vehicle = new HashSet<>();

        vehicle.add("Ferrari");
        vehicle.add("Ferrari"); // Impossible d’ajouter un doublon
        vehicle.add("Mercedes");
        vehicle.add("Lamborghini");
        System.out.println("Les véhicules disponibles dans la liste : " + vehicle);

        System.out.println(vehicle.contains("Mercedes"));

        System.out.println("La taille de la liste est " + vehicle.size());

        vehicle.remove("Lamborghini");
        vehicle.remove("Mercedes");
        System.out.println("Les véhicules disponibles dans la liste : " + vehicle);

        vehicle.clear();
        System.out.println("Les véhicules disponibles dans la liste : " + vehicle);
    }
}
```

### 2.7.4. Liste chaînée dynamique : `LinkedList`

La classe `LinkedList` est une structure de données qui représente une liste chaînée. Une liste chaînée est une façon différente de stocker plusieurs éléments les uns à la suite des autres : elle est constituée d’une succession de nœuds reliés entre eux, où chaque élément pointe vers le suivant et le précédent.

Contrairement à une `ArrayList`, qui repose sur un tableau dynamique, une `LinkedList` facilite les insertions et suppressions fréquentes d’éléments, notamment au début ou au milieu de la liste. En revanche, l’accès direct à un élément par son index est plus lent, car il faut parcourir la chaîne maillon par maillon.

Les principales méthodes disponibles pour manipuler une `LinkedList` sont : `add`, `get`, `set`, `contains`, `size`, `sort`, `remove` et `clear` :

```java
import java.util.LinkedList;
import java.util.List;
import java.util.Collections;

public class Main {
    public static void main(String[] args) {
        List<String> vehicle = new LinkedList<>();

        vehicle.add("Ferrari");
        vehicle.add("Mercedes");
        vehicle.add("Lamborghini");

        System.out.println(vehicle.get(0));

        vehicle.set(2, "Audi");
        System.out.println("Les véhicules disponibles dans la liste : " + vehicle);

        System.out.println(vehicle.contains("Mercedes"));

        System.out.println("La taille de la liste est " + vehicle.size());

        Collections.sort(vehicle);
        System.out.println("Les véhicules disponibles dans la liste après le tri : " + vehicle);

        vehicle.remove("Audi");
        vehicle.remove("Mercedes");
        System.out.println("Les véhicules disponibles dans la liste : " + vehicle);

        vehicle.clear();
        System.out.println("Les véhicules disponibles dans la liste : " + vehicle);
    }
}
```

### 2.7.5. Stocker et manipuler des paires clé–valeur : `HashMap`

La classe `HashMap` est une structure de données qui permet de stocker des paires clé/valeur. Chaque clé est unique et associée à une valeur correspondante. Cette structure fonctionne comme un dictionnaire : elle permet de retrouver rapidement une valeur à partir de sa clé, sans avoir à parcourir toute la collection. En revanche, l’ordre d’insertion des éléments n’est pas conservé.

Les principales méthodes disponibles pour manipuler un `HashMap` sont : `put`, `get`, `containsKey`, `containsValue`, `size`, `remove` et `clear` :

```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> vehicle = new HashMap<>();

        vehicle.put("Ferrari", 570);
        vehicle.put("Mercedes", 625);
        vehicle.put("Lamborghini", 740);
        System.out.println("Les véhicules disponibles dans la liste : " + vehicle);

        System.out.println(vehicle.get("Ferrari"));

        System.out.println(vehicle.containsKey("Ferrari"));
        System.out.println(vehicle.containsValue(570));

        System.out.println("La taille de la liste est " + vehicle.size());

        vehicle.remove("Lamborghini");
        vehicle.remove("Mercedes");
        System.out.println("Les véhicules disponibles dans la liste : " + vehicle);

        vehicle.clear();
        System.out.println("Les véhicules disponibles dans la liste : " + vehicle);
    }
}
```
