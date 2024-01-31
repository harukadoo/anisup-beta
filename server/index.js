const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UsersModel = require('./models/Users');


const app = express();
const port = 3001
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/anisup');

app.post('/sign-in', (request, response) => {
    const { email, password } = request.body;
    UsersModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    response.json({ status: 'Success', _id: user._id });
                } else {
                    response.json('incorrect password');
                }
            } else {
                response.json('no user existed');
            }
        })
})

app.post('/sign-up-check', (request, response) => {
    const { email } = request.body;
    UsersModel.findOne({ email: email })
        .then(user => {
            if (user) {
                response.json({ exists: true });
            } else {
                response.json({ exists: false });
            }
        })
        .catch(error => {
            console.error("Error checking user existence:", error);
            response.status(500).json({ exists: false });
        });
});

app.post('/', (request, response) => {
    console.log(request.body)
    UsersModel.create(request.body)
        .then(users => {
            console.log(users)
            return response.json(users)
        })
        .catch(error => {
            console.log('error')
            return response.json(error)
        })
})


app.get('/user/:id', (request, response) => {
    const ObjectId = mongoose.Types.ObjectId;
    const userId = request.params.id;

    console.log('Received request for user with ID:', userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(400).json({ error: 'Invalid user ID' });
    }

    UsersModel.findById(userId)
        .then(user => {
            if (user) {
                const userData = {
                    name: user.name,
                    email: user.email
                };

                console.log('Found user data:', userData);
                response.json(userData);
            } else {
                console.log('User not found');
                response.status(404).json({ error: 'User not found' });
            }
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
            response.status(500).json({ error: 'Internal server error' });
        });
});


app.get('/get-saved-anime/:userId', async (request, response) => {
    try {
        const userId = request.params.userId;

        const user = await UsersModel.findById(userId);

        if (!user) {
            return response.status(404).json({ success: false, error: 'User not found' });
        }

        const savedAnimeIds = user.saves || [];

        response.json({ success: true, savedAnimeIds });
    } catch (error) {
        console.error('Error fetching user data:', error);
        response.status(500).json({ success: false, error: 'Internal server error' });
    }
});


app.get('/get-fav-anime/:userId', async (request, response) => {
    try {
        const userId = request.params.userId;

        const user = await UsersModel.findById(userId);

        if (!user) {
            return response.status(404).json({ success: false, error: 'User not found' });
        }

        const favAnimeIds = user.favorite || [];

        response.json({ success: true, favAnimeIds });
    } catch (error) {
        console.error('Error fetching user data:', error);
        response.status(500).json({ success: false, error: 'Internal server error' });
    }
});


app.get('/get-watched-anime/:userId', async (request, response) => {
    try {
        const userId = request.params.userId;

        const user = await UsersModel.findById(userId);

        if (!user) {
            return response.status(404).json({ success: false, error: 'User not found' });
        }

        const watchedAnimeIds = user.watched || [];

        response.json({ success: true, watchedAnimeIds });
    } catch (error) {
        console.error('Error fetching user data:', error);
        response.status(500).json({ success: false, error: 'Internal server error' });
    }
});

app.post('/save-anime/:userId/:animeId', async (request, response) => {
    try {
        const { userId, animeId } = request.params;

        const user = await UsersModel.findById(userId);

        if (user) {
            const saves = user.saves || [];
            const index = saves.indexOf(animeId);

            if (index !== -1) {
                saves.splice(index, 1);
            } else {
                saves.push(animeId);
            }

            user.saves = saves;

            const updatedUser = await user.save();
            console.log('Updated user with saves:', updatedUser.saves);

            response.json({ success: true, saves: updatedUser.saves });
        } else {
            response.status(404).json({ success: false, error: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        response.status(500).json({ success: false, error: 'Internal server error' });
    }
});


app.post('/like-anime/:userId/:animeId', async (request, response) => {
    try {
        const { userId, animeId } = request.params;

        const user = await UsersModel.findById(userId);

        if (user) {
            const favorites = user.favorite || [];
            const index = favorites.indexOf(animeId);

            if (index !== -1) {
                favorites.splice(index, 1);
            } else {
                favorites.push(animeId);
            }

            user.favorite = favorites;

            const updatedUser = await user.save();
            console.log('Updated user with favorites:', updatedUser.favorite);

            response.json({ success: true, favorites: updatedUser.favorite });
        } else {
            response.status(404).json({ success: false, error: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        response.status(500).json({ success: false, error: 'Internal server error' });
    }
});


app.post('/watched-anime/:userId/:animeId', async (request, response) => {
    try {
        const { userId, animeId } = request.params;

        const user = await UsersModel.findById(userId);

        if (user) {
            const views = user.watched || [];
            const index = views.indexOf(animeId);

            if (index !== -1) {
                views.splice(index, 1);
            } else {
                views.push(animeId);
            }

            user.watched = views;

            const updatedUser = await user.save();
            console.log('Updated user with watched:', updatedUser.watched);

            response.json({ success: true, watched: updatedUser.watched });
        } else {
            response.status(404).json({ success: false, error: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        response.status(500).json({ success: false, error: 'Internal server error' });
    }
});


app.post('/check-anime-nav/:userId/:animeId', async (request, response) => {
    try {
        const { userId, animeId } = request.params;

        const user = await UsersModel.findById(userId);

        if (user) {
            const saves = user.saves || [];
            const favorites = user.favorite || [];
            const watched = user.watched || [];

            const isSaved = saves.includes(animeId);
            const isLiked = favorites.includes(animeId);
            const isWatched = watched.includes(animeId);

            response.json({ isSaved, isLiked, isWatched });
        } else {
            response.status(404).json({ isSaved: false, isLiked: false, isWatched: false, error: 'User not found' });
        }
    } catch (error) {
        console.error('Error checking anime nav:', error);
        response.status(500).json({ isSaved: false, isLiked: false, isWatched: false, error: 'Internal server error' });
    }
});

app.listen(process.env.PORT || port, () => {
    console.log(`Listening on port ${port}`)
})

