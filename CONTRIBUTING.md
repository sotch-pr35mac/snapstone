## Commitizen
This is a [Commitizen Friendly](https://github.com/commitizen/cz-cli) repository.
> **When you commit with Commitizen, you'll be prompted to fill out any required commit fields at commit time.**
> _ [Commitizen README.md](https://github.com/commitizen/cz-cli/blob/master/README.md)

### Installing Commitizen
To install Commitizen have to do is install it via npm:
```
npm install -g commitizen
```

### Using Commitizen
To commit using Commitizen, all you have to do is run `git cz` instead of `git commit`. When you are working in a Commitizen Friendly repository, `git cz` will prompt you for formatted commit messages, however, while working in a repository that does not use Commitizen, `git cz` behaves like `git commit`
.

## Adding a Feature
1. Fork it!
2. Start from develop branch `git checkout develop`
3. Create a branch `git checkout -b my-great-feature`
4. Commit your changes `git cz`
5. Submit a pull request

## Documentation / Code Clarity
Please document your code as clearly as possible. For variables, use clear and understandable variable names. Pull requests with single character variable names and spaghetti code will not be accepted.
