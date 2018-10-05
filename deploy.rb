require 'colorize'
puts '**** START SCRIPT ****'
begin
  input = ARGV[0]
  debug = (ARGV[1] == '-v')
  tmp = File.readlines 'version'
  old_version_string = tmp[0]
  old_version = old_version_string.split('.')
  new_version = old_version_string.split('.')

  case input
  when 'major'
    new_version[0] = old_version[0].to_i + 1
  when 'minor'
    new_version[1] = old_version[1].to_i + 1
  else
    raise 'invalid value: only minor/major allow'.red
  end
  new_version_string = new_version.join('.')
  puts "versionnning: [#{old_version_string}] => [#{new_version_string}]".blue

  begin
  if Process.wait spawn "docker build -t spacelama/web:#{new_version_string} ."
    raise 'Error with docker build !'.red
  end
  if Process.wait spawn "docker push spacelama/web:#{new_version_string}"
    raise 'Error with docker push !'.red
  end
  if Process.wait spawn "docker rmi spacelama/web:#{new_version_string}"
    raise 'Error with docker clean up !'.red
  end

  File.write('version', new_version_string)
  rescue StandardError => e
    puts '**** ERROR ****'.red
    puts "Error: #{e.message}".red
    puts '**** START ROLLBACK ****'.yellow
    File.write('version', old_version_string)
    puts "Downgrade: [#{new_version_string}] => [#{old_version_string}]".yellow
    puts '**** END   ROLLBACK ****'.yellow
    raise e
end
  puts '**** SUCCESS ***'.green
rescue StandardError => e
  if debug
    puts '**** DEBUG ****'.magenta
    puts debug ? "ERROR: #{e.backtrace.inspect} #{e.message}".magenta : ''
    puts '**** END DETAILS ****'.magenta
  else
    puts 'for more detail please run with -v'.magenta
  end
  puts '**** END ERROR ****'.red
end
puts '****  END  SCRIPT ****'
