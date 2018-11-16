# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     FoodFinder.Repo.insert!(%FoodFinder.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias FoodFinder.Repo
alias FoodFinder.Users.User
alias FoodFinder.Ratings.Rating

pwhash = Argon2.hash_pwd_salt("password")
pwhash2 = Argon2.hash_pwd_salt("password2")

ashwin = Repo.insert!(%User{email: "shivashankar.a@husky.neu.edu", name: "Ashwin ShivaShankar", password_hash: pwhash})

wujame = Repo.insert!(%User{email: "wujame@email.com", name: "Wu Jame", password_hash: pwhash2})


