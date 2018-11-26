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

pwhash = Argon2.hash_pwd_salt("Password1")
pwhash2 = Argon2.hash_pwd_salt("Password2")

ashwin = Repo.insert!(%User{email: "shivashankar.a@husky.neu.edu", name: "Ashwin ShivaShankar", password_hash: pwhash})

wujame = Repo.insert!(%User{email: "wujame@email.com", name: "Wu Jame", password_hash: pwhash2})

chikfila = Repo.insert!(%Rating{name: "Chik-Fil-A", restaurant_id: 1, user_id: 1, comment_text: "Superb!", rating_number: 5})
wendys = Repo.insert!(%Rating{name: "Wendy's", restaurant_id: 3, user_id: 1, comment_text: "Gross!", rating_number: 1})

bostonburgercompany = Repo.insert!(%Rating{name: "Boston Burger Comppany", restaurant_id: 2, user_id: 2, comment_text: "Wonderful!", rating_number: 4})
