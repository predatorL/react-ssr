module.exports = {
    webpack: function(config, env) {
        config.module.rules.forEach(d => {
            d.oneOf &&
                d.oneOf.forEach(e => {
                    if (e && e.options && e.options.name) {
                        e.options.name = e.options.name.replace('[hash:8].', '');
                    }
                });
        });
        return config;
    }
};
