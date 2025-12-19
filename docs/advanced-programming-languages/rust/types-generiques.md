---
id: types-generiques
title: 6. Types génériques
---

# Types génériques

En rust, **Les types génériques** permettent d’écrire des fonctions et des structures utilisables avec différents types, à condition qu’ils respectent certaines règles, tout en adoptant une approche plus stricte et plus performante.

Les principaux cas d’utilisation des types génériques :

```rust
// Génériques sur les fonctions
fn pair<T, U>(a: T, b: U) -> (T, U) {
    (a, b)
}

// Génériques sur les structures
struct S<T, U> {
    a: T,
    b: U
}

// Génériques sur les enums
enum E<T, U> {
    A(T),
    B(U)
}

// Impl avec méthode liée à l’instance
trait Container<T, U> {
    fn pair(&self) -> (&T, &U);
}

impl<T, U> Container<T, U> for S<T, U> {
    fn pair(&self) -> (&T, &U) {
        (&self.a, &self.b)
    }
}

fn main() {
    println!("{:?}", pair("Bob", 20));

    let s = S {
        a: "Bob",
        b: 20
    };
    println!("{:?}", s.pair());
}
```
