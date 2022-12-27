(async () => {
    // default imports
    const events = require('events');
    const {
        exec
    } = require("child_process")
    const logs = require("discord-logs")
    const Discord = require("discord.js")
    const {
        MessageEmbed,
        MessageButton,
        MessageActionRow,
        Intents,
        Permissions,
        MessageSelectMenu
    } = require("discord.js")
    const fs = require('fs');
    let process = require('process');
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // block imports
    const ms = require("ms")
    let https = require("https")
    const synchronizeSlashCommands = require('@frostzzone/discord-sync-commands');

    // define s4d components (pretty sure 90% of these arnt even used/required)
    let s4d = {
        Discord,
        fire: null,
        joiningMember: null,
        reply: null,
        player: null,
        manager: null,
        Inviter: null,
        message: null,
        notifer: null,
        checkMessageExists() {
            if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
            if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
        }
    };

    // check if d.js is v13
    if (!require('./package.json').dependencies['discord.js'].startsWith("^13.")) {
        let file = JSON.parse(fs.readFileSync('package.json'))
        file.dependencies['discord.js'] = '^13.12.0'
        fs.writeFileSync('package.json', JSON.stringify(file))
        exec('mpm i')
        throw new Error("Seems you arent using v13 please re-run or run `npm i discord.js@13.12.0`");
    }

    // check if discord-logs is v2
    if (!require('./package.json').dependencies['discord-logs'].startsWith("^2.")) {
        let file = JSON.parse(fs.readFileSync('package.json'))
        file.dependencies['discord-logs'] = '^2.0.0'
        fs.writeFileSync('package.json', JSON.stringify(file))
        exec('mpm i')
        throw new Error("discord-logs must be 2.0.0. please re-run or if that fails run `npm i discord-logs@2.0.0` then re-run");
    }

    // create a new discord client
    s4d.client = new s4d.Discord.Client({
        intents: [
            Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)
        ],
        partials: [
            "REACTION",
            "CHANNEL"
        ]
    });

    // when the bot is connected say so
    s4d.client.on('ready', () => {
        console.log(s4d.client.user.tag + " is alive!")
    })

    // upon error print "Error!" and the error
    process.on('uncaughtException', function(err) {
        console.log('Error!');
        console.log(err);
    });

    // give the new client to discord-logs
    logs(s4d.client);

    // pre blockly code


    // blockly code
    await s4d.client.login((process.env[String('token')])).catch((e) => {
        const tokenInvalid = true;
        const tokenError = e;
        if (e.toString().toLowerCase().includes("token")) {
            throw new Error("An invalid bot token was provided!")
        } else {
            throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
        }
    });

    synchronizeSlashCommands(s4d.client, [{
        name: 'info',
        description: 'information about the bot!',
        options: [

        ]
    }, {
        name: 'ban',
        description: 'BAN PEOPLE',
        options: [{
            type: 6,
            name: 'user',
            required: true,
            description: 'User you want to ban lollll',
            choices: [

            ]
        }, {
            type: 3,
            name: 'reason',
            required: true,
            description: 'Reason you want to ban lolll',
            choices: [

            ]
        }, ]
    }, {
        name: 'kick',
        description: 'Kick people',
        options: [{
            type: 6,
            name: 'user',
            required: true,
            description: 'User you want to kick lollll',
            choices: [

            ]
        }, {
            type: 3,
            name: 'reason',
            required: true,
            description: 'Reason you want to kick lolll',
            choices: [

            ]
        }, ]
    }, {
        name: 'timeout',
        description: 'TIMEOUT PEOPLE',
        options: [{
            type: 6,
            name: 'user',
            required: true,
            description: 'User you want to timeout',
            choices: [

            ]
        }, {
            type: 4,
            name: 'seconds',
            required: true,
            description: 'How many seconds to timeout this user',
            choices: [

            ]
        }, {
            type: 3,
            name: 'reason',
            required: true,
            description: 'What\'s the reason to timeout the user',
            choices: [

            ]
        }, ]
    }, {
        name: 'untimeout',
        description: 'UNTIMEOUT PEOPLE',
        options: [{
            type: 6,
            name: 'user',
            required: true,
            description: 'User you want to untimeout',
            choices: [

            ]
        }, {
            type: 3,
            name: 'reason',
            required: true,
            description: 'What\'s the reason to untimeout the user',
            choices: [

            ]
        }, ]
    }, {
        name: 'unban',
        description: 'UNBAN PEOPLE',
        options: [{
            type: 6,
            name: 'user',
            required: true,
            description: 'User you want to unban lollll',
            choices: [

            ]
        }, {
            type: 3,
            name: 'reason',
            required: true,
            description: 'Reason you want to unban lolll',
            choices: [

            ]
        }, ]
    }, ], {
        debug: false,

    });

    const http = require('http');
    const server = http.createServer((req, res) => {
        res.writeHead(200);
        res.end('IT WORKS LETSS GOO');
    });
    server.listen(3000);

    s4d.client.on('ready', async () => {
        s4d.client.user.setPresence({
            status: "online",
            activities: [{
                name: (['Some jams while moderating ', s4d.client.guilds.cache.size, ' servers!'].join('')),
                type: "LISTENING"
            }]
        });

    });

    s4d.client.on('interactionCreate', async (interaction) => {
        let member = interaction.guild.members.cache.get(interaction.member.user.id)
        if ((interaction.commandName) == 'info') {
            await interaction.reply({
                content: 'Hello! This bot was built by JJ Tan! More will be coming in the future!',
                ephemeral: false,
                components: []
            });
        }
        if ((interaction.commandName) == 'ban') {
            if ((interaction.member.user) != (((interaction.guild).members.cache.get('614746968643862539') || await (interaction.guild).members.fetch('614746968643862539')).user)) {
                await interaction.reply({
                    content: ('no. Are you even a moderator? ' + String(interaction.member.user)),
                    ephemeral: false,
                    components: []
                });
            }
            if ((interaction.member.user) == (((interaction.guild).members.cache.get('614746968643862539') || await (interaction.guild).members.fetch('614746968643862539')).user)) {
                (interaction.options.getMember('user')).send({
                    content: String((['You have been banned from ', interaction.guild, ' By ', interaction.member.user, ' The reason for the ban is ', interaction.options.getString('reason')].join('')))
                });
                (interaction.options.getMember('user')).ban({
                    reason: (interaction.options.getString('reason'))
                });
                await interaction.reply({
                    content: (['I have banned ', interaction.options.getMember('user'), ' Here\'s the reason ', interaction.options.getString('reason')].join('')),
                    ephemeral: false,
                    components: []
                });
            }
        }
        if ((interaction.commandName) == 'kick') {
            if ((interaction.member.user) != (((interaction.guild).members.cache.get('614746968643862539') || await (interaction.guild).members.fetch('614746968643862539')).user)) {
                await interaction.reply({
                    content: ('no. Are you even a moderator? ' + String(interaction.member.user)),
                    ephemeral: true,
                    components: []
                });
            }
            if ((interaction.member.user) == (((interaction.guild).members.cache.get('614746968643862539') || await (interaction.guild).members.fetch('614746968643862539')).user)) {
                (interaction.options.getMember('user')).send({
                    content: String((['You have been kicked from ', interaction.guild, ' By ', interaction.member.user, ' The reason for the kick is ', interaction.options.getString('reason')].join('')))
                });
                (interaction.options.getMember('user')).kick({
                    reason: (interaction.options.getString('reason'))
                });
                await interaction.reply({
                    content: (['I have kicked ', interaction.options.getMember('user'), ' Here\'s the reason ', interaction.options.getString('reason')].join('')),
                    ephemeral: false,
                    components: []
                });
            }
        }
        if ((interaction.commandName) == 'timeout') {
            if ((interaction.member.user) != (((interaction.guild).members.cache.get('614746968643862539') || await (interaction.guild).members.fetch('614746968643862539')).user)) {
                await interaction.reply({
                    content: ('no. Are you even a moderator? ' + String(interaction.member.user)),
                    ephemeral: true,
                    components: []
                });
            }
            if ((interaction.member.user) == (((interaction.guild).members.cache.get('614746968643862539') || await (interaction.guild).members.fetch('614746968643862539')).user)) {
                await interaction.reply({
                    content: (['I have timeout ', interaction.options.getMember('user'), ' For ', interaction.options.getInteger('seconds'), ' seconds. For the reason of ', interaction.options.getString('reason')].join('')),
                    ephemeral: false,
                    components: []
                });
                interaction.options.getMember('user').timeout((interaction.options.getInteger('seconds') * 1000), interaction.options.getString('reason'))
            }
        }
        if ((interaction.commandName) == 'untimeout') {
            if ((interaction.member.user) != (((interaction.guild).members.cache.get('614746968643862539') || await (interaction.guild).members.fetch('614746968643862539')).user)) {
                await interaction.reply({
                    content: ('no. Are you even a moderator? ' + String(interaction.member.user)),
                    ephemeral: true,
                    components: []
                });
            }
            if ((interaction.member.user) == (((interaction.guild).members.cache.get('614746968643862539') || await (interaction.guild).members.fetch('614746968643862539')).user)) {
                (interaction.options.getMember('user')).timeout(null)
                await interaction.reply({
                    content: (['I have untimeout ', interaction.options.getMember('user'), ' Because ', interaction.options.getString('reason')].join('')),
                    ephemeral: false,
                    components: []
                });
            }
        }
        if ((interaction.commandName) == 'unban') {
            if ((interaction.member.user) != (((interaction.guild).members.cache.get('614746968643862539') || await (interaction.guild).members.fetch('614746968643862539')).user)) {
                await interaction.reply({
                    content: ('no. Are you even a moderator? ' + String(interaction.member.user)),
                    ephemeral: false,
                    components: []
                });
            }
            if ((interaction.member.user) == (((interaction.guild).members.cache.get('614746968643862539') || await (interaction.guild).members.fetch('614746968643862539')).user)) {
                (interaction.options.getMember('user')).ban({
                    reason: (interaction.options.getString('reason'))
                });
                await interaction.reply({
                    content: (['I have unbanned ', interaction.options.getMember('user'), ' Here\'s the reason ', interaction.options.getString('reason')].join('')),
                    ephemeral: false,
                    components: []
                });
            }
        }

    });

    return s4d
})();
