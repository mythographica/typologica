# typologica

Dead Simple naive type checker for JavaScript based on constructor.name

[![Coverage Status](https://coveralls.io/repos/github/mythographica/typologica/badge.svg?branch=master)](https://coveralls.io/github/mythographica/typologica?branch=master)
![Travis (.org)](https://img.shields.io/travis/mythographica/typologica)
![NPM](https://img.shields.io/npm/l/typologica)
![GitHub package.json version](https://img.shields.io/github/package-json/v/mythographica/typologica)
![GitHub last commit](https://img.shields.io/github/last-commit/mythographica/typologica)

[![NPM](https://nodei.co/npm/typologica.png?mini=true)](https://www.npmjs.com/package/typologica)


# Idea


[Type Checking](https://en.wikipedia.org/wiki/Type_system#Type_checking) in JavaScript is very complicated for beginners. There are only [Data Types](https://en.wikipedia.org/wiki/Data_type). And everything the rest is something very different from well known and common used meaning of Types. We might be having `null` or `undefined` or something derived from `Object` or other constructors. And any derived from Object is not a Type, but Structures. And this might seem very opinionated and dependent from JavaScript Engine, but `undefined` has it's own [Constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new), and when we make  "`void 0`" will invoke that constructor for new memory pointer marked as `undefined` data. Therefore there is a lot of misunderstanding and misconceptions for those are new with JavaScript world. Sometimes it even harder for developers used to study with Strict Typing Systems in mind, but anyway, there are many pitfalls in general.

# Concept

Each constructed structure has `instance.constructor.name`, where `instance` is a pointer to our variable and `.constructor.name` is obligatory path, pointing us to the name of constructor invoked during instance creation. Therefore all non primitive so-called "types" has `.constructor.name`. And what is "non primitive" then? Eh... non Data Types, but something else. And Data Types is that sort of thing which marks memory allocation as a type: data [Primitives](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures):

* `undefined`
* `Boolean`
* `String`
* `Number`
* `Symbol`
* `BigInt`

and not so about data, but primitive of everything wich we discuss more in a moment below:

* `null` 

And isn't it true that all these have constructors? Indeed, they do. But wich sort of constructor do they have? There is a bit difference: constructors for primitives do memory allocations for Data, and they then answers the question "which data type is that allocated memory".

It is not so special, but it is different from everything the rest in JavaScript: when other constructors are for Structures, not for Data.

And there is one very special thing: superheroic `null`, which allows us to have all the other constructors. And din't `null` has own constructor itself? As it is the only SuperDuperPuperClass, and [Singleton](https://en.wikipedia.org/wiki/Singleton_pattern) we might say yes and no, simultaneously. And it is the only thing the other thing are derived from. It is so special and the same place so simple: but nobody cares of it, we just used to hate `typeof null === 'object'` and that is it. But instead of doing this, please just look for the whole system. It is simple, straight, and it might be said: "it is [Full](https://en.wikipedia.org/wiki/Complete_metric_space)".

Again: there are only Data Types and Structures, so what is the Next Step? Yes, there is a next step. And this step is [`instanceof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof). When we construct something, we might be willing to check if we did construction from exactly that constructor in future. And this points us to the next big question in JavaScript: [Inheritance](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance). It might be the other even greater complicated topic, no matter how many times you've read about it.  And from the other side there are not so many developers who was able to explain this topic well in each aspect. Remembering the early dates when there was a war between Netstcape Navigator and Internet Explorer 3~4 even I did two novelistic memoirs, please forgive me suggesting it:

* Romantic, with only one example: [Architecture of Prototype Inheritance in JavaScript](https://dev.to/wentout/architecture-of-prototype-inheritance-in-javascript-ce6/edit)
* Nostalgic, with a lot of memories behind, few examples: [Inheritance in JavaScript : Factory of Constructors with Prototype Chain : point of view from boring nerd](https://dev.to/wentout/inheritance-in-javascript-factory-of-constructors-with-prototype-chain-point-of-view-from-boring-nerd-2ddb)

Starting from this is a moment I have to say sorry again, because now I will think we can share the same meanings.

Therefore we might succeed everything constructed has an `instance.consructor.name`. But as we saw there is another big thing for Constructed: where constructible function meet [Prototype](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes) being invoked with `new` keyword. And we can rely on it, safely. The only exclusion is [`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create), but even then, there was construction derived from prototype, though constructor was `Object` itself. And we might be saying that `{}` or `[]` have not yet being constructed? But there is no other way to simplify this process, so it was just [lexer](https://en.wikipedia.org/wiki/Lexical_analysis) helping us with AST making special notes for messing up `[]` with `new Array` and `{}` with `new Object`. And even deeper, as Arrays are derived from Objects, so by the `typeof` checker `Array`s are `Object`s. This is done that way because `typeof` just checks Data Types (primitives), and `Array` is not Data Type, it is a special Structure of the other things. That is why it is an `'object'` for `typeof` checker.

Being realistic we can see it is done that way for more than 20 years ago. And it is useless and pointless to think the other way for practical usage, despite we wish the "better". And we might don't like this, but there is true beauty when we accept and understand it instead of hating. It is very useful and very simple when we can rely it without breaking it. And this more than scalable and there are no good points for making it better. "[This](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)" system is Full, it is not necessary to extend it with something else.

As we then see: everything constructed (and derived from null) returns 'object' as a result of `typeof` checking. And the special case `null` returns `object` too, because it points to the `.constructor.name` and constructor of `null` is `Object`, the only thing being singleton `null` has no properties. But truth is the following: thinking of data type checking there are no tasks of checking `.constructor.name` from `null`.

Keeping all this in mind we might build very simple system. Just being aware of the thing that does yet not implemented, this short sequence of conditional logic:

1. get the `typeof` of provided `instance`;
2. if this is not an `'object'`, then it is a primitive, and we might return the answer right now;
3. if it is `null` return `null`;
4. if `.consructor.name` returns `object`, then it is structure, derived strictly from `Object` constructor, no matter how;
5. if `.consructor.name` returns something from primitive constructors, `'String'` or `'Number'` or .., then the answer is that `.name`, for better compatibility let `.toLowerCase()` it;
6. if `.consructor.name` is `'Array'`, `'Date'`, `'Map'`, `'WeakMap'`, `'Set'`, `'WeakSet'` we might again `.toLowerCase()` the answer, because mostly this structures are used for storing Data;

7. I'd personally suggest `'RegExp'` and `'Promise'` as something very tightly coupled with data, but this is my choice, judge me an Issue;

8. And yes, there are many types for Errors, and each one of them derives `Error`, so this is just an `'error'`;

9. The last thing is [`'Function'`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function), and just because this is a very special case, there is a simple answer, we will use direct answer from `typeof` received at `1.`;


All the other types we might be willing to have in this "type checker" for our new shiny Type System will receive `.constructor.name` as an automated Profit! It is not necessary to check them deeper. If we will wish we might rely on [`Object.getPrototypeOf(instance.constructor.name)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf), and we might use underground names of constructors. If we will need it later, we might use `instanceof`. But we should rely on our personal feelings about the other modules of our codebase because of the very broken thing comes with `Object.create`'s dawn in JavaScript `;^)`:

```javascript
        function foo() {}
        var bar = { a: ‘a’};
        foo.prototype = bar; // Object {a: "a"}
        baz = Object.create(bar); // Object {a: "a"}
        baz instanceof foo // true. oops.
```
> Dear Eric, thank you very much for this example. Here is a link of Your wonderful article [Common Misconceptions About Inheritance in JavaScript](
https://medium.com/javascript-scene/common-misconceptions-about-inheritance-in-javascript-d5d9bab29b0a)

So we will either avoid using `Object.create` if we need that checks, or will invent something like hidden `Symbol`, pointing us to real constructor.

Finally if should we bring very deep Prototype Chain to codebase, for example &ndash; Object->Array->Proxy->Object &ndash; then we might choose the last `.constructor.name` as a pointer to the derived type. And for sure we might be willing additional typechecks in that case, but that is not so dead simple.

# Pros & Cons

This library is a simple explanation of how everything works. It is very small, and we may rely on it for better understanding of JavaScript structures, especially `Object`'s derived structures. And, for sure, if we will use this understanding in a combination with other libraries, which does not provide the same level of abstraction in mind, we might fail. Or from other side we might win with distinguished explanation where they fail.
