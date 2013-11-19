name = ARGV[0]
jade = File.new("jade/#{name}.jade", "w")
jade.close

coffee = File.new("coffeescript/app/#{name}.coffee", "w")
coffee.close

sass = File.new("sass/modules/#{name}.sass", "w")
sass.close